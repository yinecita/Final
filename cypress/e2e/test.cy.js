/// <reference types="cypress"/>

import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckOutPage } from "../support/pages/checkoutPage";
import { ReciptPage } from "../support/pages/reciptPage";

const constants = require('../support/constants');

describe('Final Test - Yinet', () => {
    let data1;
    let data2;
    const username = 'usuario' + Math.floor(Math.random() * 1000);
    const password = '123456!';
    const gender = "Female";
    const day = '28';
    const month = 'July';
    const year = "1990";
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckOutPage();
    const reciptPage = new ReciptPage();

    before('LoadingData', () => {
        cy.fixture('myFixture').then(myFixtureParams1 => {
            data1 = myFixtureParams1;
        });
        cy.fixture('checkoutFixture').then(myFixtureParams2 => {
            data2 = myFixtureParams2;
        })
    });

    beforeEach('Preconditions', () => {
        cy.request({
            url: "https://pushing-it.onrender.com/api/register",
            method: "POST",
            failOnStatusCode: false,
            body: {
                "username": username,
                "password": password,
                "gender": gender,
                "day": day,
                "month": month,
                "year": year
            }
        }).then(response => {
            expect(response.status).to.be.equal(200);
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('user', response.body.newUser.username);
        });

        cy.request({
            url: 'https://pushing-it.onrender.com/api/login',
            method: 'POST',
            body: {
                "username": username,
                "password": password
            }
        }).then(response => {
            expect(response.status).to.eq(200)
        });

        cy.visit('');
        homePage.clickingOnlineShopButton();
        productsPage.addingProductsToCart(data1.product1.name);
        productsPage.addingProductsToCart(data1.product2.name);
        productsPage.clickingGoShoppingCartButton();
        shoppingCartPage.checkingProductsNames('product1').should('have.text', data1.product1.name);
        shoppingCartPage.checkingProductsNames('product2').should('have.text', data1.product2.name);
        shoppingCartPage.checkingProductsPrices('product1').should('have.text', '$' + data1.product1.price.toString());
        shoppingCartPage.checkingProductsPrices('product2').should('have.text', '$' + data1.product2.price.toString());
        shoppingCartPage.clickingShowTotalPriceButton();
        shoppingCartPage.checkingTotalPrice().should('have.text', data1.product1.price + data1.product2.price);
        shoppingCartPage.clickingGoToCheckOutButton();
        checkoutPage.typingName(data2.firstName);
        checkoutPage.typingLastName(data2.lastName);
        checkoutPage.typingCardNumber(data2.cardNumber);
        checkoutPage.clickingPurchaseButton();
    });

    it('Checking Recipt', () => {
        reciptPage.checkingModalHeader().should('have.text', constants.MODAL_HEADER);
        reciptPage.checkingFullName().should('include.text', data2.firstName);
        reciptPage.checkingFullName().should('include.text', data2.lastName);
        reciptPage.checkingProduct1().should('have.text', data1.product1.name);
        reciptPage.checkingProduct2().should('have.text', data1.product2.name);
        reciptPage.checkingCardNumber().should('have.text', data2.cardNumber);
        reciptPage.checkingSpentAmount().should('have.text', constants.SPENT_AMOUNT_MESSAGE + '$' + (data1.product1.price + data1.product2.price).toString());
    });

    after('DeletingUser', () => {
        cy.request({
            url: 'https://pushing-it.onrender.com/api/deleteuser/' + username,
            method: "DELETE",
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(200)
        });
    });
});
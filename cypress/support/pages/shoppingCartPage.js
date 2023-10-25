export class ShoppingCartPage {
    constructor() {
        this.products = {
            "product1": {
                "label": '#productName[name="White Pants"]',
                "price": `//p[text()='White Pants']//following-sibling::p`,
            },
            "product2": {
                "label": '#productName[name="White Shoes"]',
                "price": `//p[text()='White Shoes']//following-sibling::p`,
            }
        }
        this.totalPriceSpan = '#price';
        this.showTotalPriceButton = "Show total price";
        this.checkOutButton = "Go to Checkout";
    };

    checkingProductsNames(product) {
        return cy.get(this.products[product].label);
    };

    checkingProductsPrices(product) {
        return cy.xpath(this.products[product].price);
    };

    clickingShowTotalPriceButton() {
        cy.contains(this.showTotalPriceButton).click();
    };

    checkingTotalPrice() {
        return cy.get(this.totalPriceSpan);
    };

    clickingGoToCheckOutButton() {
        cy.contains(this.checkOutButton).click();
    };
};
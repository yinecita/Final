const constants = require('../constants')

export class ReciptPage {
    constructor() {
        this.modalHeaderText = "Purchase has been completed successfully";
        this.fullName = "#name";
        this.cardNumberValue = '#creditCard';
        this.spentAmount = '#totalPrice';
    };

    checkingModalHeader() {
        return cy.contains(this.modalHeaderText, { timeout: constants.TIMEOUT });
    };

    checkingFullName() {
        return cy.get(this.fullName, { timeout: constants.TIMEOUT });
    };

    checkingProduct1() {
        return cy.get(this.fullName).next();
    };

    checkingProduct2() {
        return cy.get(this.cardNumberValue).prev().prev();
    };

    checkingCardNumber() {
        return cy.get(this.cardNumberValue);
    };

    checkingSpentAmount() {
        return cy.get(this.spentAmount);
    };
};
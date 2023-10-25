export class CheckOutPage {
    constructor() {
        this.nameInput = "#FirstName";
        this.lastNameInput = "#lastName";
        this.cardNumberInput = "#cardNumber";
        this.purchaseButton = "Purchase";
    };

    typingName(name) {
        cy.get(this.nameInput).type(name);
    };

    typingLastName(lastName) {
        cy.get(this.lastNameInput).type(lastName);
    };

    typingCardNumber(cardNumber) {
        cy.get(this.cardNumberInput).type(cardNumber);
    };

    clickingPurchaseButton() {
        cy.contains(this.purchaseButton).click();
    };
};
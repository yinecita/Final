export class ProductsPage {
    constructor() {
        this.closeModalButton = '#closeModal';
        this.goToShoppingCartButton = '#goShoppingCart';
    };

    addingProductsToCart(product) {
        cy.get(`[value="${product}"]`).click();
        cy.get(this.closeModalButton).click();
    };

    clickingGoShoppingCartButton() {
        cy.get(this.goToShoppingCartButton).click();
    };
};
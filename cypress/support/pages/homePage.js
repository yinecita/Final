const constants = require('../constants')

export class HomePage {
    constructor() {
        this.onlineShopButton = '#onlineshoplink';
    };

    clickingOnlineShopButton() {
        cy.get(this.onlineShopButton, { timeout: constants.TIMEOUT }).click();
    };
};
export type SortOption =
  | 'Name (A to Z)'
  | 'Name (Z to A)'
  | 'Price (low to high)'
  | 'Price (high to low)';

export class CheckoutPage {
  private readonly selectors = {
    addToCartBackpack: '#add-to-cart-sauce-labs-backpack',
    cartLink: '[data-test="shopping-cart-link"]',
    checkoutButton: '#checkout',
    firstName: '#first-name',
    lastName: '#last-name',
    postalCode: '#postal-code',
    errorMessage: '[data-test="error"]',
    continueButton: '#continue',
    finishButton: '#finish',
    completeHeader: '[data-test="complete-header"]',
    sortContainer: '[data-test="product-sort-container"]',
    productPrice: '.inventory_item_price',
    productName: '.inventory_item_name',
  } as const;

  adicionarBackpackAoCarrinho(): this {
    cy.get(this.selectors.addToCartBackpack).click();
    return this;
  }

  acessarCarrinho(): this {
    cy.get(this.selectors.cartLink).click();
    return this;
  }

  clicarCheckout(): this {
    cy.get(this.selectors.checkoutButton).click();
    return this;
  }

  preencherInformacoesDeEntrega(firstName: string, lastName: string, postalCode: string): this {
    cy.get(this.selectors.firstName).clear().type(firstName);
    cy.get(this.selectors.lastName).clear().type(lastName);
    cy.get(this.selectors.postalCode).clear().type(postalCode);
    return this;
  }

  clicarContinuar(): this {
    cy.get(this.selectors.continueButton).click();
    return this;
  }

  clicarFinalizar(): this {
    cy.get(this.selectors.finishButton).click();
    return this;
  }

  obterMensagemDeErro(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.errorMessage);
  }

  obterConfirmacaoDePedido(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.completeHeader);
  }

  obterOpcoesDeOrdenacao(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.sortContainer).find('option');
  }

  selecionarOrdenacao(opcao: SortOption): this {
    cy.get(this.selectors.sortContainer).select(opcao);
    return this;
  }

  obterPrecosDosProdutos(): Cypress.Chainable<number[]> {
    return cy.get(this.selectors.productPrice).then(($prices) => {
      return Array.from($prices).map((el) =>
        parseFloat(el.innerText.replace('$', ''))
      );
    });
  }

  obterNomesDosProdutos(): Cypress.Chainable<string[]> {
    return cy.get(this.selectors.productName).then(($names) => {
      return Array.from($names).map((el) => el.innerText.trim());
    });
  }

  realizarCompraCompleta(firstName: string, lastName: string, postalCode: string): void {
    this.adicionarBackpackAoCarrinho()
      .acessarCarrinho()
      .clicarCheckout()
      .preencherInformacoesDeEntrega(firstName, lastName, postalCode)
      .clicarContinuar()
      .clicarFinalizar();
  }
}

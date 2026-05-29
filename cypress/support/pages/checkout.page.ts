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
    productPrice: '.inventory_item_price',
    productName: '.inventory_item_name',
    inventoryDetailsName: '[data-test="inventory-item-name"], .inventory_details_name',
    inventoryDetailsDesc: '[data-test="inventory-item-desc"], .inventory_details_desc',
    inventoryDetailsPrice: '[data-test="inventory-item-price"], .inventory_details_price',
    addToCartButton: '#add-to-cart',
    removeButton: '#remove',
    backToProductsButton: '#back-to-products',
  } as const;

  adicionarBackpackAoCarrinho(): this {
    cy.get(this.selectors.addToCartBackpack).click();
    return this;
  }

  adicionarDoisItensAoCarrinho(): this {
    cy.contains('button', 'Add to cart').click();
    cy.contains('button', 'Add to cart').click();
    return this;
  }

  removerPrimeiroItemDoCarrinhoTelaCart(): this {
    cy.contains('button', 'Remove').first().click();
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

  clicarPrimeiroProduto(): this {
    cy.get(this.selectors.productName).first().click();
    return this;
  }

  validarDetalhesDoProduto(): this {
    cy.get(this.selectors.inventoryDetailsName).should('be.visible');
    cy.get(this.selectors.inventoryDetailsDesc).should('be.visible');
    cy.get(this.selectors.inventoryDetailsPrice).should('be.visible');
    cy.get(this.selectors.addToCartButton).should('be.visible');
    return this;
  }

  clicarAdicionarAoCarrinhoDetalhes(): this {
    cy.get(this.selectors.addToCartButton).click();
    return this;
  }

  validarBotaoRemove(): this {
    cy.get(this.selectors.removeButton).should('be.visible');
    return this;
  }

  validarQuantidadeCarrinho(quantidade: string): this {
    cy.get(this.selectors.cartLink).should('contain.text', quantidade);
    return this;
  }

  clicarVoltarParaProdutos(): this {
    cy.get(this.selectors.backToProductsButton).click();
    return this;
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

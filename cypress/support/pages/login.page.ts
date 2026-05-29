export class LoginPage {
  private readonly selectors = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]',
  } as const;

  preencherUser(user: string): this {
    cy.get(this.selectors.username).clear().type(user);
    return this;
  }

  preencherSenha(senha: string): this {
    cy.get(this.selectors.password).clear().type(senha);
    return this;
  }

  clicarEntrar(): void {
    cy.get(this.selectors.loginButton).click();
  }

  realizarLogin(user: string, senha: string): void {
    this.preencherUser(user).preencherSenha(senha).clicarEntrar();
  }

  obterMensagemDeErro(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.errorMessage);
  }
}

import { LoginPage } from '../support/pages/login.page';

describe('Login - SauceDemo', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('deve realizar login com credenciais válidas e redirecionar para a página de produtos', () => {
    loginPage.realizarLogin('standard_user', 'secret_sauce');

    cy.url().should('include', '/inventory');
    cy.get('.inventory_list').should('be.visible');
  });

  it('deve exibir mensagem de erro ao logar com senha inválida', () => {
    loginPage.realizarLogin('standard_user', 'senha_errada');

    loginPage
      .obterMensagemDeErro()
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });
});

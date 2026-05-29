import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/login.page';

const loginPage = new LoginPage();

Given('que estou na página de login', () => {
  cy.visit('/');
});

When('realizo login com {string} e {string}', (username: string, password: string) => {
  loginPage.realizarLogin(username, password);
});

Then('sou redirecionado para a página de produtos', () => {
  cy.url().should('include', '/inventory');
});

Then('a lista de produtos é exibida', () => {
  cy.get('.inventory_list').should('be.visible');
});

Then('o sistema deve exibir a mensagem de erro {string}', (mensagem: string) => {
  loginPage
    .obterMensagemDeErro()
    .should('be.visible')
    .and('contain.text', mensagem);
});

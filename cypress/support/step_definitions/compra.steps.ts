import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/login.page';
import { CheckoutPage } from '../pages/checkout.page';

const loginPage = new LoginPage();
const checkoutPage = new CheckoutPage();

Given('que o usuário está logado com {string} e {string}', (username: string, password: string) => {
  cy.visit('/');
  loginPage.realizarLogin(username, password);
});

Given('está na página de produtos', () => {
  cy.url().should('include', '/inventory');
});

When('o usuário realiza uma compra completa com os dados {string}, {string} e {string}', (firstName: string, lastName: string, postalCode: string) => {
  checkoutPage.realizarCompraCompleta(firstName, lastName, postalCode);
});

Then('o sistema deve exibir a confirmação de pedido com {string}', (message: string) => {
  checkoutPage
    .obterConfirmacaoDePedido()
    .should('be.visible')
    .and('contain.text', message);
});

When('o usuário clica no primeiro produto da lista', () => {
  checkoutPage.clicarPrimeiroProduto();
});

Then('o sistema exibe os detalhes do produto como título, descrição, preço e botão de adicionar ao carrinho', () => {
  checkoutPage.validarDetalhesDoProduto();
});

When('adiciona o produto ao carrinho pela tela de detalhes', () => {
  checkoutPage.clicarAdicionarAoCarrinhoDetalhes();
});

Then('o botão deve mudar para {string}', (botaoState: string) => {
  if (botaoState === 'Remove') {
    checkoutPage.validarBotaoRemove();
  }
});

Then('o ícone do carrinho deve exibir a quantidade {string}', (quantidade: string) => {
  checkoutPage.validarQuantidadeCarrinho(quantidade);
});

When('o usuário clica em voltar para os produtos', () => {
  checkoutPage.clicarVoltarParaProdutos();
});

Then('o usuário deve ser redirecionado para a página de produtos', () => {
  cy.url().should('include', '/inventory');
});

When('o usuário adiciona dois itens genéricos ao carrinho', () => {
  checkoutPage.adicionarDoisItensAoCarrinho();
});

When('o usuário acessa o carrinho', () => {
  checkoutPage.acessarCarrinho();
});

When('remove o primeiro item da lista do carrinho', () => {
  checkoutPage.removerPrimeiroItemDoCarrinhoTelaCart();
});



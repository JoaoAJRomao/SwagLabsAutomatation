import { LoginPage } from '../support/pages/login.page';
import { CheckoutPage, SortOption } from '../support/pages/checkout.page';

describe('Fluxo de Compra - SauceDemo', () => {
  const loginPage = new LoginPage();
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.visit('/');
    loginPage.realizarLogin('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory');
  });

  it('deve adicionar produto ao carrinho, finalizar a compra e exibir confirmação de pedido', () => {
    checkoutPage.realizarCompraCompleta('João', 'Tester', '12345');

    checkoutPage
      .obterConfirmacaoDePedido()
      .should('be.visible')
      .and('contain.text', 'Thank you for your order!');
  });

  it('deve exibir detalhes do produto ao clicar no primeiro item', () => {
    checkoutPage.clicarPrimeiroProduto();
    checkoutPage.validarDetalhesDoProduto();
  });

  it('deve adicionar item ao carrinho pela tela de detalhes e voltar para os produtos', () => {
    checkoutPage.clicarPrimeiroProduto();

    checkoutPage.clicarAdicionarAoCarrinhoDetalhes();
    checkoutPage.validarBotaoRemove();
    checkoutPage.validarQuantidadeCarrinho('1');

    checkoutPage.clicarVoltarParaProdutos();
    cy.url().should('include', '/inventory');
  });

  it('deve adicionar 2 itens ao carrinho, ir para checkout e remover o primeiro, validando quantidade', () => {
    checkoutPage.adicionarDoisItensAoCarrinho();
    checkoutPage.validarQuantidadeCarrinho('2');

    checkoutPage.acessarCarrinho();
    checkoutPage.removerPrimeiroItemDoCarrinhoTelaCart();
    
    checkoutPage.validarQuantidadeCarrinho('1');
  });

  it('deve exibir as 4 opções de ordenação disponíveis no dropdown', () => {
    const opcoesEsperadas: SortOption[] = [
      'Name (A to Z)',
      'Name (Z to A)',
      'Price (low to high)',
      'Price (high to low)',
    ];

    checkoutPage.obterOpcoesDeOrdenacao().should('have.length', 4);

    opcoesEsperadas.forEach((opcao) => {
      checkoutPage
        .obterOpcoesDeOrdenacao()
        .contains(opcao)
        .should('exist');
    });
  });

  context('Ordenação de Produtos', () => {
    type CasoDeOrdenacao =
      | { opcao: 'Name (A to Z)' | 'Name (Z to A)'; tipo: 'nome' }
      | { opcao: 'Price (low to high)' | 'Price (high to low)'; tipo: 'preco' };

    const casos: CasoDeOrdenacao[] = [
      { opcao: 'Name (A to Z)', tipo: 'nome' },
      { opcao: 'Name (Z to A)', tipo: 'nome' },
      { opcao: 'Price (low to high)', tipo: 'preco' },
      { opcao: 'Price (high to low)', tipo: 'preco' },
    ];

    casos.forEach(({ opcao, tipo }) => {
      it(`deve ordenar os produtos corretamente ao selecionar "${opcao}"`, () => {
        checkoutPage.selecionarOrdenacao(opcao);

        if (tipo === 'nome') {
          checkoutPage.obterNomesDosProdutos().then((nomes) => {
            const nomesOrdenados = [...nomes].sort((a, b) =>
              opcao === 'Name (A to Z)'
                ? a.localeCompare(b)
                : b.localeCompare(a)
            );
            expect(nomes).to.deep.equal(nomesOrdenados);
          });
        } else {
          checkoutPage.obterPrecosDosProdutos().then((precos) => {
            const precosOrdenados = [...precos].sort((a, b) =>
              opcao === 'Price (low to high)' ? a - b : b - a
            );
            expect(precos).to.deep.equal(precosOrdenados);
          });
        }
      });
    });
  });
});


# language: pt
Funcionalidade: Fluxo de Compra no SauceDemo
  Como um usuário do site SauceDemo
  Quero poder gerenciar os itens no meu carrinho e finalizar a compra
  Para adquirir produtos online

  Contexto:
    Dado que o usuário está logado com "standard_user" e "secret_sauce"
    E está na página de produtos

  Cenário: Realizar compra completa com sucesso
    Quando o usuário realiza uma compra completa com os dados "João", "Tester" e "12345"
    Então o sistema deve exibir a confirmação de pedido com "Thank you for your order!"

  Cenário: Visualizar detalhes do primeiro produto
    Quando o usuário clica no primeiro produto da lista
    Então o sistema exibe os detalhes do produto como título, descrição, preço e botão de adicionar ao carrinho

  Cenário: Adicionar produto pelo detalhe e voltar para lista
    Quando o usuário clica no primeiro produto da lista
    E adiciona o produto ao carrinho pela tela de detalhes
    Então o botão deve mudar para "Remove"
    E o ícone do carrinho deve exibir a quantidade "1"
    Quando o usuário clica em voltar para os produtos
    Então o usuário deve ser redirecionado para a página de produtos

  Cenário: Adicionar 2 itens e remover o primeiro na tela de checkout
    Quando o usuário adiciona dois itens genéricos ao carrinho
    Então o ícone do carrinho deve exibir a quantidade "2"
    Quando o usuário acessa o carrinho
    E remove o primeiro item da lista do carrinho
    Então o ícone do carrinho deve exibir a quantidade "1"


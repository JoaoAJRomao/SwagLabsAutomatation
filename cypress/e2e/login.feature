# language: pt
Funcionalidade: Login no SauceDemo
  Como um usuário do sistema
  Quero poder acessar o sistema com minhas credenciais
  Para poder ver e comprar produtos

  Contexto:
    Dado que estou na página de login

  Cenário: Login com credenciais válidas
    Quando realizo login com "standard_user" e "secret_sauce"
    Então sou redirecionado para a página de produtos
    E a lista de produtos é exibida

  Cenário: Login com senha inválida
    Quando realizo login com "standard_user" e "senha_errada"
    Então o sistema deve exibir a mensagem de erro "Epic sadface: Username and password do not match any user in this service"

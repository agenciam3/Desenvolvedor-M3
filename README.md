<h1 align="center"> Projeto Desenvolvedor M3 👩🏻‍💻 </h1>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rodar-o-projeto">Rodar o projeto</a>&nbsp;&nbsp;&nbsp;
</p>

<br><br>

## 💻 Projeto

O projeto é a reprodução de um layout de e-commerce e algumas funcionalidades desejadas. É um desafio para avaliar meus conhecimentos fundamentais de Front-end, de preferência sem a utilização de nenhum framework.
<br><br>

## 🚀 Tecnologias e Características

Esse projeto foi desenvolvido com as seguintes tecnologias/características:

- HTML
- CSS
- Node.js
- Javascript/Typescript
- Consumo de API
- Versionamento Git
- Sass
- Responsividade
  <br><br>

## ⚙ Funcionalidades

- Requisição a API para obter os produtos
- Filtrar produtos por cor, tamanho e preço
- Adicionar produto ao carrinho
- Carregar mais produtos

## ▶ Rodar o projeto

- Primeiro passo, clone o projeto em sua máquina (ou se desejar, crie um fork e após isso clone o projeto)
- Abra a pasta do projeto no terminal
- Instale as dependências com o comando `npm install`
- Inicie o servidor com o comando `npm start`, que levantará 2 servidores, sendo eles:

  - um para acessar o front-end, que roda na porta 3000. No qual pode ser acessado pela url: http://localhost:3000

  - um para o json-server que irá exportar uma API com a lista de produtos que roda na porta 5000. Para acessar os produtos acesse a url: http://localhost:5000/products

#### OBS: durante o desenvolvimento, um dos problemas encontrados foi a execução do comando `npm start`, caso você também receba este erro tente trocar o caminho atual do comando para 👉🏻 `"start": "node_modules/.bin/cross-env SERVER_API=http://localhost:5000 npm-run-all --parallel dev server"`.

##### Contato: [laynamoraaes@hotmail.com](mailto:laynamoraaes@hotmail.com)

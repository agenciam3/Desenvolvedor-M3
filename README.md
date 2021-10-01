# Venha ser um desenvolvedor da Digital M3

Ola, somos a Agência Digital M3, uma agência voltada para ramo de comercio eletrônico, trabalhamos com implantação, migração, evolução e otmização de e-commerces. Estamos com a sede de desenvolvimento em Nova Friburgo RJ e um escritório comercial na cidade de São Paulo.

Em Nova Friburgo estamos na: 
> R. Helena Coutinho, 41 
> Braunes, Nova Friburgo/RJ
[https://goo.gl/maps/2mWagcctnrGdtFhBA]( https://goo.gl/maps/2mWagcctnrGdtFhBA )

Estamos procurando Desenvolvedores(as) `Front-end`, com sólidos conhecimentos em HTML, CSS e JS para projetar interfaces e entregar a melhor experiência para os consumidores visando sempre a otimização do código e agilidade no desenvolvimento.

## O que procuramos

### Requisitos Obrigatórios

- Html5, css3;
- Javascript, jquery;
- Versionamento Git;
- Grunt/gulp;
- Sass/less;
- Sites responsivos;
- Iniciativa, criatividade e colaboração;
- Boas práticas: reutilização de código, semântica, organização, performance.

### Desejáveis:

- Experiência com algum CMS
- Conhecimento/Experiência em Vtex
- React

----

## Como se candidatar a vaga

- [Crie um fork desse projeto;](https://github.com/agenciam3/Desenvolvedor-M3/fork)
- No seu fork, codifique o layout seguindo as instruções abaixo;
- Atualize o readme com as instruções necessárias para rodar o seu código;
- Adicione também seu e-mail de contato ao readme do projeto ( caso seu e-mail do github esteja privado )
- Faça um pull request (ou envie para [heraldo@digitalm3.com.br](mailto:heraldo@digitalm3.com.br?subject=Vaga%20DEV%20-%20Digital%20M3)


**obs.**: link do projeto [github.com/agenciam3/Desenvolvedor-M3](https://github.com/agenciam3/Desenvolvedor-M3)

### Instruções para o teste

O layout se encontra na pasta "layout" em PSD e PNG.

### Obrigatório

- HTML5 e CSS3
- Interação com JSON para renderizar os produtos (fique livre para criar o JSON no formato que achar mais adequado)
- Interação com JSON para filtar os produtos
- Funcionalidade: Filtrar produtos por cor, tamanho e preço.
- Funcionalidade: Adicionar produto ao carrinho.
- Funcionalidade: Carregar mais produtos.
- Não utilizar Bootstrap, Foundation Css, Semantic ui ou semelhantes ;
- Responsividade

#### Bônus

- Javascript sem plugins e modular
- Grunt, Gulp ou similar

##### Dúvidas: [heraldo@digitalm3.com.br](mailto:heraldo@digitalm3.com.br?subject=Dúvida%20Vaga%20DEV%20-%20Digital%20M3)

----
## Instruções para executar o site

### Requisitos

- NodeJs

### Execução

- Abra o terminal na pasta do projeto
- Execute o comando:
```bash 
	npx json-server --watch ./data/db.json
```
- Abra o arquivo index.html pelo navegador

### Observações

- Caso queira adicionar mais alguma opção de cor basta adicionar uma string na lista 'colors' na index.js
- Caso queira adicionar mais alguma opção de tamanho basta adicionar uma string na lista 'sizes' na index.js
- Caso queira adicionar mais alguma opção de preço basta adicionar uma string na lista 'prices' na index.js, a string deve ter o formato "menorPreço/maiorPreço". O maior preço como '-1' significa que é do menor preço para cima(sem limite de preço).

- Não existe uma página para o carrinho mas todos os produtos adicionados vão para a lista 'carrinho' dentro da classe 'ProductController'


## E-mail de contato

- davidpnora@outlook.com


# Desafio Desenvolvedor M3

## Contato

E-mail: nicholascostadev@gmail.com

## Tecnologias utilizadas

- HTML.
- SCSS.
- JavaScript sem a utilização de frameworks.

## Como rodar localmente

### Requisitos

1. git
2. Nodejs na versão >=14

Depois disso é só colocar os comandos abaixo em sequência no seu terminal de preferência.

```bash
# Clone o repositório
git clone https://github.com/nicholascostadev/Desenvolvedor-M3
# Entre na pasta do projeto
cd Desenvolvedor-M3
# Instale as dependências
npm install
# Inicie o servidor de desenvolvimento
npm start
```

## O que eu melhoraria se pudesse

Fiz o desafio tentando deixar da maneira mais concisa possível por orientação do próprio desafio, mas eu melhoraria algumas coisas se pudesse, como:

1. Usaria TypeScript, atualmente para entender o código é 10x mais complicado do que seria caso estivesse sendo usado o TypeScript, e possíveis bugs seriam resolvidos facilmente antes de ocorrerem.
2. Faria os menus do mobile um tipo de "componente" completamente novo ao invés de tentar aproveitar o do desktop, porque dessa maneira, a acessibilidade ficaria melhor e a estrutura e o CSS estariam mais legíveis.
3. Aplicaria os filtros na própria API, pois fazer filtragem + paginação no front-end não é a melhor opção pelo o que eu vejo no dia a dia, pelo fato de caso você filtre no Front-end, os dados podem estar desatualizados. Também ajuda na parte de performance, pois o usuário receberá os dados filtrados já do Back-end ao invés de ter que rodar as operações no próprio browser.

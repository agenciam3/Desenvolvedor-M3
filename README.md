# Frontend Desenvolvedora M3

Este projeto é um fork deste repositório https://github.com/agenciam3/Desenvolvedor-M3.

O layout desejado se encontra no [Figma](https://www.figma.com/file/hPfcV6VClVfkHCtje9997Q/Desafio-m3?node-id=0%3A1).

---

## React

Para fazer o React funcionar, como não era possível utilizar a ferramenta `create-react-app`, pesquisei no google e encontrei uma maneira de incluir o React no projeto.

### Babel

Para utilizar React no projeto, foi adicionada esta dependência [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)

### Webpack

O webpack carrega os arquivos da pasta `src/js`, para funcionar com React, adicionei o `@babel/preset-react` no arquivo webpack.config.js.

Para que eu pudesse importar outros arquivos jsx, eu tive que adicioná-los manualmente no arquivo `webpack.config.js`, sei que pode ter formas melhores de fazer, mas como este repositório é um teste não tem problema ficar assim.

> Todo arquivo novo React deve ser adicionado no webpack.config.js

### Gulp

Para reconhecer tags React no projeto (exemplo: `<h1>Hello World</h1>`), tive que alterar a extensão de arquivo de `js` para `jsx`.

### Renderização

Para renderizar os componentes React, utilizei `ReactDOM.createRoot` como descrito na [documentação oficial do React 18](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis).

---

## Estrutura do projeto

As páginas do projeto estão salvas em `src/js/pages` e os componentes que são reutilizáveis estão salvos em `src/js/components`.

---

## Instalação e execução do projeto

O projeto possui um setup pronto no qual há a necessidade de possuir o nodejs instalado na versão 16.18.0 ou superior.

Para instalar as dependencias só é preciso executar o comando: npm install

Para dar o start no server é necessário executar o comando: npm run dev

<b>Obs:</b> o Frontend irá executar na porta: 3000

---

## Contato

Email: adrianemaciel.developer@gmail.com

Linkedin: linkedin.com/in/adrianemacieldeveloper/

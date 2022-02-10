import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f5f7fa;
    color: #333;
    line-height: 1.6;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (min-width: 769px) {
    body {
      font-size: 16px;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;

export default GlobalStyles;

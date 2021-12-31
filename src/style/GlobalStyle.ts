import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import Theme from './Theme';


const GlobalStyle = createGlobalStyle`
  ${normalize};
  *, *:before, *:after {  box-sizing: border-box; }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${Theme.palette.border.main};
    box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
  body {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    background: url('/bg.jpeg') no-repeat center center fixed;
    color: ${Theme.palette.text.primary};
    ${Theme.typography.body};
  }

  html, body, #root {
    height: 100%;
  }
`;

export default GlobalStyle;
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :focus{
        outline: 0;
    }
    body{
      background: #1C1C1C;
      display: flex;
      align-items: center;
      justify-content: center;
      height: auto;
    }
`

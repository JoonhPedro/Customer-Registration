import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/global.ts'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './config/themes.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <GlobalStyle />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

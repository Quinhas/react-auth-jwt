import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { CustomRoutes } from './routes';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: 'gray.50',
        color: 'gray.800',
      },
    },
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <CustomRoutes />
      </AuthContextProvider>
    </ChakraProvider>
  </BrowserRouter>
)
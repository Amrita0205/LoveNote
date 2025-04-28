import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme.jsx';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
);
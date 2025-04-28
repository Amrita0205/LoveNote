// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      900: '#1a1a2e',
      800: '#2a2a3e',
      700: '#3a3a4e',
    },
    neon: {
      pink: '#ff00ff',
      cyan: '#00ffff',
    },
  },
  fonts: {
    heading: "'Orbitron', sans-serif",
    body: "'Orbitron', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
});

export default theme;
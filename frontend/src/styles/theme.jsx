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
        cursor: "url('/figcursor2.png') 5 5, auto !important", // Added Figma-style cursor
        'a, button, .chakra-button': {
        '&:hover': { // Apply hover cursor globally
          cursor: "url('/pointer3.png') 5 5, auto !important",
        },
      },
      },
      // '.cursor-ring': {
      //   position: 'fixed',
      //   top: 0,
      //   left: 0,
      //   width: '24px',
      //   height: '24px',
      //   border: '2px solid',
      //   borderColor: 'neon.cyan', // Matches your theme
      //   borderRadius: '50%',
      //   pointerEvents: 'none',
      //   transform: 'translate(-50%, -50%)',
      //   transition: 'transform 0.15s ease',
      //   zIndex: 9999,
      // },
    },
  },
});

export default theme;
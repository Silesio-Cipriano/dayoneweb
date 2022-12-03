import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#FFFFFF',
    },
    black: {
      '900': '#292934',
      '100': '#CCCCCC',
    },
  },
  fonts: {
    heading: 'Lato',
    body: 'Nunito',
  },
  styles: {
    global: {
      body: {
        bg: 'white.900',
      },
    },
  },
});

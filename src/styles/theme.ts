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
    green: {
      '100': '#EAFFEF',
      '900': '#38B359',
    },
    blue: {
      '400': '#D0ECF4',
      '100': '#56707E',
    },
    red: {
      '900': '#EE4A4A',
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

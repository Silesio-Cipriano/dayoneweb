import { Center, ChakraProvider, Text } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
        <Center my="20">
          <Text
            fontSize={[16, 20]}
            color="blackAlpha.600"
            fontFamily="Lato"
            fontWeight="medium"
          >
            © {new Date().getFullYear()} Day One
          </Text>
        </Center>
      </AuthProvider>
    </ChakraProvider>
  );
}

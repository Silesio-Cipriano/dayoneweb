import { Center, ChakraProvider, Text } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Day one - Memento</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
        <Center my="20">
          <Text
            fontSize={[16, 20]}
            color="blackAlpha.600"
            fontFamily="Lato"
            fontWeight="medium"
          >
            © {new Date().getFullYear()} Day One - Silésio Cipriano
          </Text>
        </Center>
      </AuthProvider>
    </ChakraProvider>
  );
}

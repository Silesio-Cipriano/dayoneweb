import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  Link as ChakraUILink,
} from '@chakra-ui/react';
import { Header } from '../components/Header';
import Emoji from '../../assets/EmojiVendeta.svg';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '../services/axios';
import { parseCookies } from 'nookies';

export default function Home() {
  return (
    <>
      <Flex flexDir="column" w="100vw" pb={['100', '', '', '200']}>
        <Header variant="normal" />
        <Box
          backgroundImage={'./images/Background.svg'}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          w={['100vw', '10vw', '97vw']}
          h={['90vh', '80vh']}
          visibility={['hidden', 'visible']}
          pos={'absolute'}
          top="100"
          zIndex={-1}
          bottom="100"
        ></Box>

        <Flex
          mx={['auto']}
          w={'100%'}
          h="100%"
          flexDir="column"
          px="4"
          maxWidth={1300}
          mt={['100', '200']}
          align="center"
          alignItems="center"
          alignContent="center"
          textAlign="center"
          justify="center"
        >
          <Text
            fontFamily="Lato"
            fontSize={['xm', '4xl']}
            mt="20px"
            mx={['12']}
            px={['0', '', '0']}
            fontWeight="bold"
          >
            Transforme seus pensamentos em palavras
          </Text>
          <Text
            fontSize={['xs', '2xl']}
            fontWeight="medium"
            textAlign="center"
            mt="20px"
            mx={['0', '', '12']}
            px={['0', '', '0']}
          >
            "desenvolvido para ajudá-lo a organizar seus pensamentos e
            sentimentos. Com ele, você pode registrar suas reflexões, metas e
            realizações de forma fácil e intuitiva, experimente o day one."
          </Text>

          <ChakraUILink
            as={Link}
            href="/"
            fontFamily="Lato"
            fontSize={['xl', '3xl']}
            fontWeight="bold"
            mt="20px"
            _hover={{ textDecoration: 'none', borderColor: 'blue.400' }}
            borderBottomWidth={3}
            borderRadius={2}
          >
            Entrar
          </ChakraUILink>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['dayone.token']: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/mydaynotes',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

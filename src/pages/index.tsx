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
      <Header variant="normal" />
      <Box
        backgroundImage={'./images/Background.svg'}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        w="100vw"
        h="85vh"
      >
        <Flex
          w="100%"
          maxWidth={1360}
          mx="auto"
          h="80%"
          flexDir="column"
          px="4"
          align="center"
          alignItems="center"
          alignContent="center"
          textAlign="center"
          justify="center"
        >
          <Text fontFamily="Lato" fontSize="4xl" fontWeight="bold" w="550px">
            A maneira mais simples e criativa{'\n'}de fazer anotações diarias
          </Text>
          <Text fontSize="2xl" fontWeight="medium" w="650px" mt="20px">
            "Para manter suas ideias organizadas e suas anotações diárias mais
            dinâmicas, experimente o day one."
          </Text>

          <ChakraUILink
            as={Link}
            href="/"
            fontFamily="Lato"
            fontSize="3xl"
            fontWeight="bold"
            mt="20px"
            _hover={{ textDecoration: 'none', borderColor: 'blue.400' }}
            borderBottomWidth={3}
            borderRadius={2}
          >
            Entrar
          </ChakraUILink>
        </Flex>
      </Box>
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

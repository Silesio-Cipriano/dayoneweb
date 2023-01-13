import {
  Flex,
  Text,
  Link as ChakraUILink,
  Img,
  Button,
  Box,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

export default function Error404() {
  const router = useRouter();

  return (
    <>
      <Box
        backgroundImage={'./images/Background.svg'}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        h="100vh"
        w="100vw"
      >
        <Flex justify="space-between" align="center">
          <Flex
            flexDir="column"
            justify={['center', 'center', 'center']}
            mt={['200', '160', '', '200', '250']}
            ml={['0', '14', '', '', '400']}
            w="100vw"
          >
            <Flex flexDir="column" align="center" w="400px">
              <Text
                fontSize={['48', '48', '80px']}
                textAlign={['center', 'center', 'start']}
              >
                Day One
              </Text>
              <Text
                fontSize={['14', '24']}
                mt="10"
                textAlign={['center', 'center', 'start']}
              >
                A pagina não foi encontrada
              </Text>
              <Text
                fontSize={['100', '', '180px']}
                textAlign={['center', 'start']}
              >
                404
              </Text>
              <ChakraUILink
                as={Link}
                href="/dsa"
                textAlign={['center', 'start']}
              >
                <Button w="300px" h="12" bgColor="black.900" color="white">
                  Pagina principal
                </Button>
              </ChakraUILink>
            </Flex>
          </Flex>
          <Flex>
            <Img
              src={'/images/YoungDreamer.svg'}
              w="90"
              h={['200', '400', '400', '700', '900']}
              bottom="0"
              right="0"
              position="fixed"
            ></Img>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Divide } from 'react-feather';
import LogoGmail from '../../assets/logoGmail.svg';
import { InputForm } from '../../components/Form/Input';
export default function Login() {
  return (
    <Flex
      w="100%"
      h="90vh"
      maxWidth={[428, 580]}
      m="auto"
      flexDir="column"
      align="center"
      justify="center"
      px="4"
    >
      <Flex
        w="100%"
        flexDir="column"
        p="2"
        align="center"
        justify="center"
        gap="4"
        as="form"
      >
        <Heading fontSize={48}>CRIAR CONTA</Heading>
        <ChakraLink mt="10" w="100%" _hover={{ textDecoration: 'none' }}>
          <Button w="100%" h={20} gap="10">
            <Image src={LogoGmail} />
            <Text>Criar com conta google</Text>
          </Button>
        </ChakraLink>
        <Flex w="100%" align="center" gap="10">
          <Divider h="0.4" bg="black" />
          <Text>Ou</Text>
          <Divider h="0.4" bg="black" />
        </Flex>
        <InputForm
          label="Nome"
          name="nome"
          isRequired
          placeholder="Digite o seu nome"
          w={[270, 456]}
          _placeholder={{ fontSize: 16 }}
        />
        <InputForm
          label="Email"
          name="email"
          type="email"
          isRequired
          w={[270, 456]}
          placeholder="Digite o seu email"
          _placeholder={{ fontSize: 16 }}
        />
        <InputForm
          label="Data nascimento"
          name="dataNascimento"
          id="dataNascimento"
          type="date"
          w={[270, 456]}
          placeholder="Digite a sua senha"
          _placeholder={{ fontSize: 16 }}
        />
        <InputForm
          label="Senha"
          name="senha"
          isRequired
          type="password"
          w={[270, 456]}
          placeholder="Digite a sua senha"
          _placeholder={{ fontSize: 16 }}
        />

        <Flex justify="space-between" w="100%" gap="10" mt="6">
          <ChakraLink
            as={Link}
            href="login"
            _hover={{ textDecoration: 'none' }}
          >
            <Button
              w={[128, 188]}
              variant="outline"
              h={[14, 84]}
              borderRadius="4"
              fontSize={[16, 20]}
            >
              Entrar
            </Button>
          </ChakraLink>

          <Button
            bg="black.900"
            w={[200, 300]}
            h={[14, 84]}
            borderRadius="4"
            color="white"
            fontSize={[16, 20]}
            type="submit"
          >
            Criar conta
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

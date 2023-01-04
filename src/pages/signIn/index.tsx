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
import { useContext } from 'react';
import { Divide } from 'react-feather';
import { useForm } from 'react-hook-form';
import LogoGmail from '../../assets/logoGmail.svg';
import { InputForm } from '../../components/Form/Input';
import { AuthContext } from '../../context/AuthContext';

type ISignInData = {
  email: string;
  password: string;
};
export default function SignIn() {
  const { register, handleSubmit } = useForm<ISignInData>();

  const { signIn } = useContext(AuthContext);

  async function signInSubmit(data: ISignInData) {
    await signIn(data);
  }
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
      <form onSubmit={handleSubmit(signInSubmit)}>
        <Flex
          w="100%"
          flexDir="column"
          p="2"
          align="center"
          justify="center"
          gap="4"
        >
          <Heading fontSize={48}>ENTRAR</Heading>
          <ChakraLink mt="10" w="100%" _hover={{ textDecoration: 'none' }}>
            <Button w="100%" h={20} gap="10">
              <Image src={LogoGmail} />
              <Text>Entrar com conta google</Text>
            </Button>
          </ChakraLink>

          <Flex w="100%" align="center" gap="10">
            <Divider h="0.4" bg="black" />
            <Text>Ou</Text>
            <Divider h="0.4" bg="black" />
          </Flex>
          <InputForm
            {...register('email')}
            label="Email"
            name="email"
            placeholder="Digite o seu email"
            w={[270, 456]}
            _placeholder={{ fontSize: 16 }}
          />
          <InputForm
            {...register('password')}
            label="Senha"
            name="password"
            type="password"
            w={[270, 456]}
            placeholder="Digite a sua senha"
            _placeholder={{ fontSize: 16 }}
          />

          <Flex justify="space-between" w="100%" gap="10" mt="6">
            <Button
              bg="black.900"
              w={[200, 300]}
              h={[14, 84]}
              borderRadius="4"
              color="white"
              fontSize={[16, 20]}
              type="submit"
            >
              Entrar
            </Button>

            <ChakraLink
              as={Link}
              href="/signUp"
              _hover={{ textDecoration: 'none' }}
            >
              <Button
                w={[128, 188]}
                variant="outline"
                h={[14, 84]}
                borderRadius="4"
                fontSize={[16, 20]}
              >
                Criar conta
              </Button>
            </ChakraLink>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

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
import { signUpRequest } from '../../services/signUp';

type ISignUp = {
  name: string;
  email: string;
  password: string;
  birthday: string;
};
export default function SignUp() {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<ISignUp>();

  async function signUpSubmit(data: ISignUp) {
    console.log('SignUpData:', data);
    await signUpRequest(data).then(async () => {
      await signIn({ email: data.email, password: data.password });
    });
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
      <Flex
        w="100%"
        flexDir="column"
        p="2"
        align="center"
        justify="center"
        gap="4"
        as="form"
        onSubmit={handleSubmit(signUpSubmit)}
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
          {...register('name')}
          label="Nome"
          name="name"
          isRequired
          placeholder="Digite o seu nome"
          w={[270, 456]}
          _placeholder={{ fontSize: 16 }}
        />
        <InputForm
          {...register('email')}
          label="Email"
          name="email"
          type="email"
          isRequired
          w={[270, 456]}
          placeholder="Digite o seu email"
          _placeholder={{ fontSize: 16 }}
        />
        <InputForm
          {...register('birthday')}
          label="Data nascimento"
          name="birthday"
          id="dataNascimento"
          type="date"
          w={[270, 456]}
          placeholder="Digite a sua senha"
          _placeholder={{ fontSize: 16 }}
        />
        <InputForm
          {...register('password')}
          label="Senha"
          name="password"
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

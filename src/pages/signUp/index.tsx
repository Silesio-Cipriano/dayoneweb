import {
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../components/Form/Input';
import { NotificationStatusModal } from '../../components/NotificationStatusModal/NotificationStatusModal';
import { AuthContext } from '../../context/AuthContext';
import { signUpRequest } from '../../services/signUp';
import { ModalNotification } from '../../utils/types';

type ISignUp = {
  name: string;
  email: string;
  password: string;
  birthday: string;
};
export default function SignUp() {
  const [modalNotificationStatus, setModalNotificationStatus] = useState(false);
  const [modalNotification, setModalNotification] = useState<ModalNotification>(
    {} as ModalNotification
  );
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<ISignUp>();

  function changeStatusSucessModal() {
    setModalNotificationStatus(!modalNotificationStatus);
  }

  async function signUpSubmit(data: ISignUp) {
    setLoading(true);
    const age =
      new Date().getFullYear() - new Date(data.birthday).getFullYear();

    if (age >= 12) {
      await signUpRequest(data)
        .then(() => {
          setModalNotification({
            title: 'Sucesso',
            description:
              'Verifique a sua caixa no email, para validar a conta na Day One!',
            variant: 'Sucess',
          });

          changeStatusSucessModal();
          setLoading(false);
        })
        .catch((e) => {
          setModalNotification({
            title: 'Falha',
            description: 'O e-mail já foi usado!',
            variant: 'Error',
          });
          setLoading(false);
          changeStatusSucessModal();
        });
    } else {
      setModalNotification({
        title: 'Idade invalida',
        description: 'Tem uma idade inferior á 12 anos!',
        variant: 'Warning',
      });
      setLoading(false);
      changeStatusSucessModal();
    }
  }

  return (
    <>
      <NotificationStatusModal
        title={modalNotification.title}
        description={modalNotification.description}
        variant={modalNotification.variant}
        open={modalNotificationStatus}
        close={changeStatusSucessModal}
      />
      <Flex
        w="100%"
        h={['70vh', '80vh']}
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
          <Heading fontSize={[24, 48]} pb="15" pt="20">
            CRIAR CONTA
          </Heading>
          {/* <ChakraLink mt="10" w="100%" _hover={{ textDecoration: 'none' }}>
          <Button w="100%" h={20} gap="10">
            <Image src={LogoGmail} />
            <Text>Criar com conta google</Text>
          </Button>
        </ChakraLink>
        <Flex w="100%" align="center" gap="10">
          <Divider h="0.4" bg="black" />
          <Text>Ou</Text>
          <Divider h="0.4" bg="black" />
        </Flex> */}
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
              href="/signIn"
              _hover={{ textDecoration: 'none' }}
            >
              <Button
                w={[128, 188]}
                variant="outline"
                h={[14, 84]}
                borderRadius="4"
                fontSize={[16, 20]}
                isDisabled={loading}
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
              isDisabled={loading}
            >
              {!loading ? (
                <Text> Criar conta</Text>
              ) : (
                <Spinner
                  size={['md', 'lg']}
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                />
              )}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

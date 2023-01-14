import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import { Divide } from 'react-feather';
import { useForm } from 'react-hook-form';
import LogoGmail from '../../assets/logoGmail.svg';
import { InputForm } from '../../components/Form/Input';
import { NotificationStatusModal } from '../../components/NotificationStatusModal/NotificationStatusModal';
import { AuthContext } from '../../context/AuthContext';
import { getAPIClient } from '../../services/axios';
import { ModalNotification } from '../../utils/types';

type ISignInData = {
  email: string;
  password: string;
};

export default function SignIn({
  active,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [modalNotificationStatus, setModalNotificationStatus] = useState(false);
  const [modalNotification, setModalNotification] = useState<ModalNotification>(
    {} as ModalNotification
  );
  const [state, setState] = useState(active);
  const { register, handleSubmit } = useForm<ISignInData>();

  function changeStatusSucessModal() {
    setModalNotificationStatus(!modalNotificationStatus);
  }
  const { signIn } = useContext(AuthContext);

  async function signInSubmit(data: ISignInData) {
    await signIn(data)
      .then(() => {
        setModalNotification({
          title: 'Sucesso',
          description: 'Tenha um bom dia e aproveite o Day One!',
          variant: 'Sucess',
        });
        changeStatusSucessModal();
      })
      .catch((e) => {
        setModalNotification({
          title: 'Falha',
          description: 'E-mail ou senha invalida!',
          variant: 'Error',
        });
        changeStatusSucessModal();
      });
  }

  useEffect(() => {
    if (active) {
      setModalNotification({
        title: 'Sucesso',
        description: 'Sua conta foi validada, ja pode entrar no Day One!',
        variant: 'Sucess',
      });
      setState(false);
      changeStatusSucessModal();
    }
  }, []);
  return (
    <Center>
      <NotificationStatusModal
        title={modalNotification.title}
        description={modalNotification.description}
        variant={modalNotification.variant}
        open={modalNotificationStatus}
        close={changeStatusSucessModal}
      />
      <Flex
        w="100vw"
        h="100vh"
        flexDir="column"
        align="center"
        justify="center"
        mx="auto"
      >
        <Flex
          flexDir="column"
          align="center"
          justify="center"
          gap="4"
          w="100vw"
          as="form"
          onSubmit={handleSubmit(signInSubmit)}
        >
          <Heading fontSize={[24, 48]} pb="15" pt="10">
            ENTRAR
          </Heading>
          {/* <ChakraLink mt="10" w="100%" _hover={{ textDecoration: 'none' }}>
            <Button w="100%" h={20} gap="10">
              <Image src={LogoGmail} />
              <Text>Entrar com conta google</Text>
            </Button>
          </ChakraLink>

          <Flex w="100%" align="center" gap="10">
            <Divider h="0.4" bg="black" />
            <Text>Ou</Text>
            <Divider h="0.4" bg="black" />
          </Flex> */}
          <Flex
            flexDir="column"
            gap="4"
            justify="center"
            align="center"
            maxWidth={[300, 556]}
          >
            <InputForm
              {...register('email')}
              label="Email"
              name="email"
              placeholder="Digite o seu email"
              w={[258, 456]}
              _placeholder={{ fontSize: 16 }}
            />
            <InputForm
              {...register('password')}
              label="Senha"
              name="password"
              type="password"
              w={[258, 456]}
              placeholder="Digite a sua senha"
              _placeholder={{ fontSize: 16 }}
            />

            <Flex justify="space-between" maxWidth={[300, 556]} gap="10" mt="6">
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
        </Flex>
      </Flex>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);

  let active = false;
  const userId = ctx.query.xns;
  const { ['dayone.token']: token } = parseCookies(ctx);

  await apiClient
    .post('/user/status', {
      userId,
      status: 'ACTIVE',
    })
    .then((response) => {
      active = true;
    })
    .catch((e) => console.log('Sem utilizador para validar'));

  if (token) {
    return {
      redirect: {
        destination: '/mydaynotes',
        permanent: false,
      },
    };
  }

  return {
    props: {
      active,
    },
  };
};

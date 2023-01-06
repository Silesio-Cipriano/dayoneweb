import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Icon,
  Image,
  Input,
  Text,
  Link as ChakraUILink,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { CheckCircle, Upload, UploadCloud, X } from 'react-feather';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { InputForm } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { dataArray } from '../../utils/data';
import FormData from 'form-data';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { userAcronim } from '../../utils/userAcronim';
import Link from 'next/link';
import { formatDate } from '../../utils/formatData';
import { api } from '../../services/api';
import { useForm } from 'react-hook-form';
import { Router, useRouter } from 'next/router';
import { NotificationStatusModal } from '../../components/NotificationStatusModal/NotificationStatusModal';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { getAPIClient } from '../../services/axios';

type User = {
  avatar: any;
  name: string;
  birthday: string;
};
export default function MyProfile() {
  const { register, handleSubmit } = useForm<User>();
  const [sucessModal, setSucessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  function changeStatusSucessModal() {
    setSucessModal(!sucessModal);
  }

  function changeStatusErrorModal() {
    setErrorModal(!errorModal);
  }

  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<any>();
  const [birthday, setBirthDay] = useState('');
  const [avatar, setAvatar] = useState('');
  const formData = new FormData();

  async function changeAvatar(uploadUser: any) {
    const value = await uploadUser?.target?.files[0];
    const avatar = URL.createObjectURL(value);
    setAvatar(avatar);
    setFile(value);
    return value;
  }

  const router = useRouter();

  async function uploadUser() {
    const data = file;
    formData.append('avatar', data);

    await api
      .put('/user/', {
        name,
        birthday,
      })
      .then(async (response) => {
        if (data) {
          await api
            .patch('/user/avatar', formData, {
              headers: { 'content-type': 'multipart/form-data' },
            })
            .then((response) => {
              changeStatusSucessModal();
              setTimeout(changeStatusSucessModal, 5000);
            })
            .catch((e) => {
              changeStatusErrorModal();
              setTimeout(changeStatusErrorModal, 5000);
            });
        } else {
          changeStatusSucessModal();
          setTimeout(changeStatusSucessModal, 5000);
        }
        setTimeout(router.reload, 5000);
      });
  }
  useEffect(() => {
    setName(user?.name + '');
    setEmail(user?.email + '');
    setAvatar(user?.avatar + '');
    const birth = formatDate(user?.birthday + '');
    setBirthDay(birth);
    console.log(birth);
  }, [user]);

  return (
    <>
      <NotificationStatusModal
        title="Sucesso"
        description="Suas alteraçoes foram salvas!"
        variant="Sucess"
        open={sucessModal}
        close={changeStatusSucessModal}
      />
      <NotificationStatusModal
        title="Falha"
        description="Não foi possivel salvar a imagem, tente de novo ou tente outra imagem!"
        variant="Error"
        open={errorModal}
        close={changeStatusErrorModal}
      />
      <Header variant="logged" />
      <Flex
        w="100%"
        mt={['6', '20']}
        maxWidth={1360}
        mx="auto"
        flexDir="column"
        align="center"
        justify="center"
        px="4"
      >
        <Flex
          as="form"
          onSubmit={handleSubmit(uploadUser)}
          flexDir="column"
          gap={6}
          align="center"
        >
          <FormLabel alignItems="center" variant="unstyled">
            {avatar ? (
              <Image
                src={avatar}
                borderRadius={10}
                w={[100, 176]}
                h={[94, 170]}
                objectFit="cover"
              />
            ) : (
              <Flex
                w={[100, 176]}
                h={[94, 170]}
                align="center"
                justify="center"
                borderWidth={1}
                borderRadius={10}
                borderColor="black.900"
              >
                <Text
                  fontSize={['24', '58']}
                  fontWeight="bold"
                  textAlign="center"
                >
                  {userAcronim(user?.name + '')}
                </Text>
              </Flex>
            )}

            <Center bg="red">
              <Icon
                as={Upload}
                boxSize={['8', '10']}
                mt={['-8', '-10']}
                px={['1', '2']}
                bg="black.900"
                color="white"
                borderRadius="2"
              />
            </Center>
            <Input
              {...register('avatar')}
              type="file"
              id="upload"
              variant="unstyled"
              onChange={(e) => changeAvatar(e)}
              hidden
            />
          </FormLabel>

          <InputForm
            {...register('name')}
            label="Nome"
            name="name"
            placeholder="Digite o seu nome"
            w={[270, 456]}
            value={name}
            onChange={(e) => setName(e.target.value)}
            _placeholder={{ fontSize: 16 }}
          />
          {/* <InputForm
            label="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            w={[270, 456]}
            placeholder="Digite o seu email"
            _placeholder={{ fontSize: 16 }}
          /> */}
          <InputForm
            {...register('birthday')}
            label="Data nascimento"
            name="birthday"
            id="dataNascimento"
            type="date"
            value={birthday}
            onChange={(e) => setBirthDay(e.target.value)}
            w={[270, 456]}
            placeholder="Digite a sua senha"
            _placeholder={{ fontSize: 16 }}
          />
          {/* <Flex
            justify="space-between"
            flexDir={['column', 'row']}
            w="100%"
            gap="10"
          >
            <InputForm
              label="Senha"
              name="senha"
              type="password"
              w={[270, 190]}
              placeholder="Digite a sua senha"
              _placeholder={{ fontSize: 16 }}
            />
            <InputForm
              label="Confirmar Senha"
              name="senha02"
              type="password"
              w={[270, 190]}
              placeholder="Digite a sua senha"
              _placeholder={{ fontSize: 16 }}
            />
          </Flex> */}

          <Button
            bg="black.900"
            w="100%"
            h={[74, 84]}
            borderRadius="4"
            color="white"
            fontSize={[16, 20]}
            type="submit"
          >
            Salvar alterações
          </Button>
          {/* <ChakraUILink as={Link} href="" color="red.900">
            Esqueci a minha senha
          </ChakraUILink> */}
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['dayone.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

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
} from '@chakra-ui/react';
import { Upload, UploadCloud } from 'react-feather';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { InputForm } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { dataArray } from '../../utils/data';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { userAcronim } from '../../utils/userAcronim';
import Link from 'next/link';
import { formatDate } from '../../utils/formatData';

export default function MyProfile() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [avatar, setAvatar] = useState('');

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
      <Header variant="logged" />
      <Flex
        w="100%"
        mt={['6', '20']}
        maxWidth={1480}
        mx="auto"
        flexDir="column"
        align="center"
        justify="center"
        px="4"
      >
        <Flex as="form" flexDir="column" gap={6} align="center">
          <FormLabel htmlFor="upload" alignItems="center" variant="unstyled">
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
              type="file"
              id="upload"
              variant="unstyled"
              hidden
              onChange={(e) => console.log(e.target.value)}
            />
          </FormLabel>

          <InputForm
            label="Nome"
            name="nome"
            placeholder="Digite o seu nome"
            w={[270, 456]}
            value={name}
            onChange={(e) => setName(e.target.value)}
            _placeholder={{ fontSize: 16 }}
          />
          <InputForm
            label="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            w={[270, 456]}
            placeholder="Digite o seu email"
            _placeholder={{ fontSize: 16 }}
          />
          <InputForm
            label="Data nascimento"
            name="dataNascimento"
            id="dataNascimento"
            type="date"
            value={birthDay}
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
          >
            Salvar alterações
          </Button>
          <ChakraUILink as={Link} href="" color="red.900">
            Esqueci a minha senha
          </ChakraUILink>
        </Flex>
      </Flex>
    </>
  );
}

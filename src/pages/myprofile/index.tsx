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
} from '@chakra-ui/react';
import { Upload, UploadCloud } from 'react-feather';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { InputForm } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { dataArray } from '../../utils/data';

export default function MyProfile() {
  const data = dataArray;
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
            <Image
              src="https://images.pexels.com/photos/7250029/pexels-photo-7250029.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              borderRadius={10}
              w={[100, 176]}
              h={[94, 170]}
              objectFit="cover"
            />
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
            <Input type="file" id="upload" variant="unstyled" hidden />
          </FormLabel>

          <InputForm
            label="Nome"
            name="nome"
            placeholder="Digite o seu nome"
            w={[270, 456]}
            _placeholder={{ fontSize: 16 }}
          />
          <InputForm
            label="E-mail"
            name="email"
            type="email"
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
          <Flex
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
              name="senha"
              type="password"
              w={[270, 190]}
              placeholder="Digite a sua senha"
              _placeholder={{ fontSize: 16 }}
            />
          </Flex>

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
        </Flex>
      </Flex>
    </>
  );
}

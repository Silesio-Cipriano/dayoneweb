import {
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { ReactNode, useState } from 'react';
import { getAPIClient } from '../../services/axios';
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { useForm } from 'react-hook-form';
import { CreateNote } from '../../utils/types';
import { newNoteRequest } from '../../services/notes';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { api } from '../../services/api';

interface IEmojiProps {
  id: string;
  url: string;
}

export default function CreateDayNote({
  emojis,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data: IEmojiProps[] = emojis;
  const [modalVisible, setModalVisible] = useState(false);
  const [emoji, setEmoji] = useState<IEmojiProps>(data[data.length - 1]);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
  const sizeEmoji = [12, 16, 24];

  const { register, handleSubmit } = useForm<CreateNote>();

  function modalVisibleStatus() {
    setModalVisible(!modalVisible);
  }
  function changeStatus(id: string) {
    let emo = data[Number(id)];
    setEmoji(emo);
    modalVisibleStatus();
  }

  async function submitNewNote(data: CreateNote) {
    data.reaction_EmojiId = emoji.id;
    await newNoteRequest(data)
      .then(() => {
        Router.push('/mydaynotes');
      })
      .catch((e) => {
        console.log('Error: ', e);
      });
  }

  return (
    <>
      <Header variant="logged" />
      <Flex
        w="100%"
        maxWidth={1360}
        mx="auto"
        flexDir="column"
        px="4"
        as="form"
        onSubmit={handleSubmit(submitNewNote)}
      >
        <Flex
          w="100%"
          maxWidth={1080}
          mx="auto"
          flexDir="column"
          gap={['10', '6']}
        >
          <Flex justify="space-between" align="center" mt="20">
            <Heading>Nova</Heading>
            <Button
              w={[124, 255]}
              h={[10, 50]}
              variant="outline"
              borderRadius="full"
              border="2px"
              type="submit"
              colorScheme="black.900"
              _hover={{ bg: 'black.900', color: 'white', border: '2px' }}
              fontSize={['xs', 'xl']}
            >
              Salvar
            </Button>
          </Flex>

          <Textarea
            {...register('title')}
            name="title"
            fontSize={[16, 20]}
            placeholder="Frase do dia"
            variant="filled"
            resize="none"
            bg="blue.400"
          />
          <Flex gap="16" w="100%" justify="space-between">
            <Input
              {...register('authorOfTitle')}
              name="authorOfTitle"
              fontSize={[16, 20]}
              placeholder="Autor da frase"
              variant="filled"
              h={16}
              bg="blue.400"
            />
            <Button bg="blue.400" h={16} w={284} onClick={modalVisibleStatus}>
              <Image src={emoji.url} w={'12'} />
            </Button>
          </Flex>
          <Textarea
            {...register('description')}
            name="description"
            fontSize={[16, 20]}
            placeholder="Escrever"
            variant="filled"
            resize="none"
            h={[245, 328]}
            bg="blue.400"
          />
        </Flex>
      </Flex>
      <Modal
        isOpen={modalVisible}
        size={[sizes[1], sizes[4]]}
        onClose={() => {
          modalVisibleStatus;
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Status</ModalHeader>
          <ModalCloseButton onClick={modalVisibleStatus} />
          <ModalBody pb="10" m="auto" w="100%">
            <Grid
              templateColumns={['repeat(4, 1fr)']}
              gap={[6, 10]}
              alignItems="center"
              ml="2"
            >
              {data.map((emoji, index) => {
                return (
                  <Button
                    key={index}
                    h="max-content"
                    w="max-content"
                    bg="none"
                    variant="unstyled"
                    onClick={() => changeStatus(emoji.id)}
                  >
                    <Image src={emoji.url} w={[sizeEmoji[1], sizeEmoji[2]]} />
                  </Button>
                );
              })}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient();
  const response = await api.get('/note/reaction_emoji');
  const emojis: IEmojiProps[] = response.data;

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
    props: {
      emojis,
    },
  };
};

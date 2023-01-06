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
import { CreateNote, NoteData } from '../../utils/types';
import { newNoteRequest, uploadNoteRequest } from '../../services/notes';
import Router, { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

interface IEmojiProps {
  id: string;
  url: string;
}

export default function EditDayNote({ emojis, note }: any) {
  const data: IEmojiProps[] = emojis;
  const noteData: NoteData = note;
  const [modalVisible, setModalVisible] = useState(false);
  const [emoji, setEmoji] = useState<IEmojiProps>(
    data[Number(noteData.note.reaction_EmojiId)]
  );
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
  const sizeEmoji = [12, 16, 24];

  const { register, handleSubmit } = useForm<CreateNote>({
    defaultValues: {
      title: noteData.note.title,
      authorOfTitle: noteData.note.authorOfTitle,
      description: noteData.note.description,
    },
  });

  function modalVisibleStatus() {
    setModalVisible(!modalVisible);
  }
  function changeStatus(id: string) {
    let emo = data[Number(id)];
    setEmoji(emo);
    modalVisibleStatus();
  }

  async function submitUploadNote(data: CreateNote) {
    const noteId = noteData.note.id;
    data.reaction_EmojiId = emoji.id;
    await uploadNoteRequest(data, noteId)
      .then(() => {
        Router.push('/mydaynotes');
      })
      .catch((e) => {
        alert('Erro');
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
        onSubmit={handleSubmit(submitUploadNote)}
      >
        <Flex
          w="100%"
          maxWidth={1080}
          mx="auto"
          flexDir="column"
          gap={['10', '6']}
        >
          <Flex justify="space-between" align="center" mt="20">
            <Heading>Editar</Heading>
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
  const apiClient = getAPIClient(ctx);

  const noteId = ctx.query.nxiu6s;

  const { ['dayone.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }

  let response = await apiClient.get('/note/reaction_emoji');
  const emojis: IEmojiProps[] = response.data;

  response = await apiClient.get(`/note/${noteId}`);
  const note: NoteData = response.data;

  return {
    props: {
      emojis,
      note,
    },
  };
};

import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { useState } from 'react';
import { getAPIClient } from '../../services/axios';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { CreateNote, ModalNotification, NoteData } from '../../utils/types';
import { uploadNoteRequest } from '../../services/notes';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { NotificationStatusModal } from '../../components/NotificationStatusModal/NotificationStatusModal';

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

  const [modalNotificationStatus, setModalNotificationStatus] = useState(false);
  const [modalNotification, setModalNotification] = useState<ModalNotification>(
    {} as ModalNotification
  );

  const [loading, setLoading] = useState(false);

  function changeStatusSucessModal() {
    setModalNotificationStatus(!modalNotificationStatus);
  }

  function modalVisibleStatus() {
    setModalVisible(!modalVisible);
  }
  function changeStatus(id: string) {
    let emo = data[Number(id)];
    setEmoji(emo);
    modalVisibleStatus();
  }

  async function submitUploadNote(data: CreateNote) {
    setLoading(true);
    const noteId = noteData.note.id;
    data.reaction_EmojiId = emoji.id;
    setTimeout(async () => {
      await uploadNoteRequest(data, noteId)
        .then(() => {
          Router.push('/mydaynotes');
        })
        .catch((e) => {
          setModalNotification({
            title: 'Falha',
            description:
              'Não foi possivel salvar a nota, esse serviço esta inativo no momento',
            variant: 'Error',
          });
          setLoading(false);
          changeStatusSucessModal();
        });
    }, 1000);
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
          gap={['4', '6']}
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
              isDisabled={loading}
            >
              {!loading ? (
                <Text>Salvar</Text>
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

          <Textarea
            {...register('title')}
            name="title"
            mt={[4, 0]}
            fontSize={[16, 20]}
            placeholder="Frase do dia"
            variant="filled"
            spellCheck={false}
            resize="none"
            required
            bg="blue.400"
          />
          <Flex
            gap={['2', '16']}
            w="100%"
            flexDir={['row']}
            justify="space-between"
            align="end"
          >
            <Input
              {...register('authorOfTitle')}
              name="authorOfTitle"
              fontSize={[14, 20]}
              placeholder="Autor da frase"
              variant="filled"
              spellCheck={false}
              required
              h={16}
              bg="blue.400"
            />
            <Button
              bg="blue.400"
              h={16}
              w={[28, 284]}
              onClick={modalVisibleStatus}
            >
              <Image src={emoji.url} w={'12'} />
            </Button>
          </Flex>
          <Textarea
            {...register('description')}
            name="description"
            fontSize={[16, 20]}
            required
            placeholder="Escrever"
            variant="filled"
            resize="none"
            spellCheck={false}
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

import { Center, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { Header } from '../../components/Header';
import { NotificationStatusModal } from '../../components/NotificationStatusModal/NotificationStatusModal';
import { TitleArea } from '../../components/TitleArea';
import { getAPIClient } from '../../services/axios';
import { deleteNoteRequest } from '../../services/notes';
import { ModalNotification, NoteData } from '../../utils/types';

export default function MyDayNotes({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data, setData] = useState<NoteData[]>([...notes]);
  const dataLength = data.length - 1;
  const [modalNotificationStatus, setModalNotificationStatus] = useState(false);
  const [modalNotification, setModalNotification] = useState<ModalNotification>(
    {} as ModalNotification
  );
  const [loading, setLoading] = useState(false);

  function changeStatusSucessModal() {
    setModalNotificationStatus(!modalNotificationStatus);
  }

  async function deleteNote(id: string) {
    setLoading(true);
    setTimeout(async () => {
      await deleteNoteRequest(id)
        .then(() => {
          const newData = data.filter((data) => data.note.id !== id);
          setData([...newData]);
          setLoading(false);
        })
        .catch((e) => {
          setModalNotification({
            title: 'Falha',
            description: 'Não foi possivel deletar a nota!',
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
        mt={['6', '20']}
        maxWidth={1360}
        mx="auto"
        flexDir="column"
        px="4"
      >
        <TitleArea variantComponent="user" day={dataLength + 2} />
        <Flex
          w="100%"
          mt={['10', '20']}
          maxWidth={1360}
          mx="auto"
          flexDir="column"
          gap={['10', '20']}
        >
          {data.length > 0 ? (
            data.map((note, index) => {
              return (
                <MyDayCard
                  key={index}
                  data={note}
                  index={dataLength - index + 1}
                  deleteNote={deleteNote}
                  loading={loading}
                />
              );
            })
          ) : (
            <Flex flexDir="column" align="center">
              <Image
                w={['224px', '324px']}
                src="https://res.cloudinary.com/dqodxamgl/image/upload/v1673598375/DayOne/Emoji/crying-cat-face_q5b9nr.svg"
              />
              <Text
                fontFamily="Lato"
                fontWeight="light"
                color="blackAlpha.600"
                fontSize="28"
              >
                “Sem day notes”
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['dayone.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signUp',
        permanent: false,
      },
    };
  }

  const response = await apiClient.get('/note/user');
  const notes: NoteData[] = response.data;
  return {
    props: {
      notes,
    },
  };
};

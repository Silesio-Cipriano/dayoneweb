import { Center, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { getAPIClient } from '../../services/axios';
import { deleteNoteRequest } from '../../services/notes';
import { NoteData } from '../../utils/types';

export default function MyDayNotes({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data, setData] = useState<NoteData[]>([...notes]);
  const dataLength = data.length - 1;

  async function deleteNote(id: string) {
    await deleteNoteRequest(id);
    const newData = data.filter((data) => data.note.id !== id);
    setData([...newData]);
  }

  return (
    <>
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

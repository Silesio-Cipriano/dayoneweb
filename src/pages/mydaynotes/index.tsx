import { Center, Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { getAPIClient } from '../../services/axios';
import { deleteNoteRequest } from '../../services/notes';
import { dataArray } from '../../utils/data';
import { NoteData } from '../../utils/types';

export default function MyDayNotes() {
  const dat = dataArray;
  const [data, setData] = useState<NoteData[]>([...dat]);
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
          {data.map((note, index) => {
            return (
              <MyDayCard
                key={index}
                data={note}
                index={dataLength - index + 1}
                deleteNote={deleteNote}
              />
            );
          })}
        </Flex>
        <Center my={['8', '20']}>
          <Text fontSize={[16, 24]} fontFamily="Lato" fontWeight="medium">
            Desenvolvido por Silésio L. Cipriano
          </Text>
        </Center>
      </Flex>
    </>
  );
}

<<<<<<< HEAD
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// const apiClient = getAPIClient(ctx);
// const { ['dayone.token']: token } = parseCookies(ctx);
=======
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const apiClient = getAPIClient(ctx);
  const { ['dayone.token']: token } = parseCookies(ctx);
>>>>>>> 0b8eec9 (fix vercel 02)

// if (!token) {
//   return {
//     redirect: {
//       destination: '/signIn',
//       permanent: false,
//     },
//   };
// }

<<<<<<< HEAD
// const response = await apiClient.get('/note/user');
// const notes: NoteData[] = response.data;

// console.log('Notas MyDayNotes: ', not  es);
// return {
// props: {
// notes,
// },
// };
// };
=======
  // const response = await apiClient.get('/note/user');
  // const notes: NoteData[] = response.data;

  // console.log('Notas MyDayNotes: ', notes);
  return {
    props: {
      // notes,
    },
  };
};
>>>>>>> 0b8eec9 (fix vercel 02)

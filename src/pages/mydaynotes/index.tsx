import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { getAPIClient } from '../../services/axios';
import { deleteNoteRequest } from '../../services/notes';
import { NoteData } from '../../utils/types';

export default function MyNotes({ notes }: any) {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient();
  // const apiClient = getAPIClient(ctx);
  // const { ['dayone.token']: token } = parseCookies(ctx);

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/signIn',
  //       permanent: false,
  //     },
  //   };
  // }

  const response = await apiClient.get('/note/user');
  const notes: NoteData[] = response.data;
  return {
    props: {
      notes,
    },
  };
};

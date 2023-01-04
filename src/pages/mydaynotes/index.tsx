import { Center, Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { getAPIClient } from '../../services/axios';
import { dataArray } from '../../utils/data';
import { NoteData } from '../../utils/types';

export default function MyNotes({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data: NoteData[] = notes;
  return (
    <>
      <Header variant="logged" />
      <Flex
        w="100%"
        mt={['6', '20']}
        maxWidth={1480}
        mx="auto"
        flexDir="column"
        px="4"
      >
        <TitleArea variantComponent="user" />
        <Flex
          w="100%"
          mt={['10', '20']}
          maxWidth={1480}
          mx="auto"
          flexDir="column"
          gap={['10', '20']}
        >
          {data.map((data, index) => {
            return <MyDayCard key={index} data={data} />;
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

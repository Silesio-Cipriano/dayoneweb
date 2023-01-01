import { Center, Flex, Text } from '@chakra-ui/react';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { dataArray } from '../../utils/data';

export default function MyNotes() {
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
          {data.map((data) => {
            return <MyDayCard data={data} />;
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

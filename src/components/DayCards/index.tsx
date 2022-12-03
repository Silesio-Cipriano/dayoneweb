import { Flex, Divider } from '@chakra-ui/react';
import { Actions } from './Actions';
import { Content } from './Content';
import { Title } from './Title';
import { Top } from './Top';
interface CardProps {
  author: string;
  createdAt: string;
  title: string;
  authorTitle: string;
  description: string;
  likes: number;
  numberOfComments: number;
}

interface DayCardProps {
  data: CardProps;
}

export function DayCard({ data }: DayCardProps) {
  return (
    <>
      <Flex>
        <Flex flex={1} flexDir="column">
          <Top autor={data.author} createdAt={data.createdAt} />
          <Title title={data.title} authorTitle={data.authorTitle} />
          <Content description={data.description} />
          <Actions
            likes={data.likes}
            numberOfComments={data.numberOfComments}
          />
        </Flex>
      </Flex>
      <Divider border="1.2" />
    </>
  );
}

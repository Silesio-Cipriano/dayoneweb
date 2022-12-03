import { Flex, Divider } from '@chakra-ui/react';
import { Actions } from '../Actions';
import { Content } from '../Content';
import { Title } from '../Title';
import { Top } from '../Top';
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

export function MyDayCard({ data }: DayCardProps) {
  return (
    <>
      <Flex>
        <Flex flex={1} flexDir="column">
          <Title
            title={data.title}
            authorTitle={data.authorTitle}
            createdAt={data.createdAt}
            variantComponent="your"
          />
          <Content description={data.description} />
          <Actions
            likes={data.likes}
            numberOfComments={data.numberOfComments}
            variantComponent="your"
          />
        </Flex>
      </Flex>
      <Divider border="1.2" />
    </>
  );
}

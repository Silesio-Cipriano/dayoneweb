import { Flex, Divider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
// import { Actions } from '../Actions';
import { Content } from '../Content';
import { Title } from '../Title';
import { Top } from '../Top';
const Actions = dynamic(() => import('../Actions').then((mod) => mod.Actions), {
  ssr: false,
});
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

export function DayCardFeed({ data }: DayCardProps) {
  return (
    <>
      <Flex flex={1} flexDir="column">
        <Top autor={data.author} createdAt={data.createdAt} />
        {/* <Title title={data.title} authorTitle={data.authorTitle} /> */}
        {/* <Content description={data.description} /> */}
        {/* <Actions
          likes={data.likes}
          numberOfComments={data.numberOfComments}
          variantComponent="normal"
        /> */}
      </Flex>
      <Divider border="1.2" />
    </>
  );
}

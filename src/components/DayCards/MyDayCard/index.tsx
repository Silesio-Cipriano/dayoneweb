import { Flex, Divider } from '@chakra-ui/react';
import { NoteData } from '../../../utils/types';
import { Actions } from '../Actions';
import { Content } from '../Content';
import { Title } from '../Title';
import { Top } from '../Top';

interface DayCardProps {
  data: NoteData;
}

export function MyDayCard({ data }: DayCardProps) {
  return (
    <>
      <Flex>
        <Flex flex={1} flexDir="column">
          <Title
            title={data.note.title}
            authorTitle={data.note.authorOfTitle}
            createdAt={new Date(data.note.createAt) + ''}
            variantComponent="your"
          />
          <Content
            description={data.note.description}
            emoji={data.reaction_Emoji.url}
          />
          <Actions likes={2} numberOfComments={4} variantComponent="your" />
        </Flex>
      </Flex>
      <Divider border="1.2" />
    </>
  );
}

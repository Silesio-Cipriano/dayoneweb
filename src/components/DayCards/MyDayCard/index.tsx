import { Flex, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import { formatDate } from '../../../utils/formatData';
import { NoteData } from '../../../utils/types';
import { ModalDeleteNote } from '../../modalDeleteNote/ModalDeleteNote';
import { Actions } from '../Actions';
import { Content } from '../Content';
import { Title } from '../Title';
import { Top } from '../Top';

interface DayCardProps {
  data: NoteData;
  index: number;
  deleteNote: (id: string) => void;
  loading: boolean;
}

export function MyDayCard({ data, index, deleteNote, loading }: DayCardProps) {
  const [modalDeleteNote, setModalDeleteNote] = useState(false);
  function changeStatusModal() {
    setModalDeleteNote(!modalDeleteNote);
  }

  function modalSubmit(id: string) {
    deleteNote(id);
    changeStatusModal();
  }

  return (
    <>
      <ModalDeleteNote
        changeStatusModal={changeStatusModal}
        modalDeleteNote={modalDeleteNote}
        submitModal={modalSubmit}
        idNote={data.note.id}
        day={index}
        loading={loading}
      />
      <Flex>
        <Flex flex={1} flexDir="column">
          <Title
            title={data.note.title}
            authorTitle={data.note.authorOfTitle}
            createdAt={formatDate(data.note.createAt)}
            variantComponent="your"
            index={index}
          />
          <Content
            description={data.note.description}
            emoji={data.reaction_Emoji.url}
          />
          <Actions
            likes={2}
            numberOfComments={4}
            variantComponent="your"
            deleteModal={changeStatusModal}
            idNote={data.note.id}
          />
        </Flex>
      </Flex>

      <Divider border="1.2" />
    </>
  );
}

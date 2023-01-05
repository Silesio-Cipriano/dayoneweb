import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface IModalProps {
  modalDeleteNote: boolean;
  changeStatusModal: () => void;
  submitModal: (id: string) => void;
  idNote: string;
}

export function ModalDeleteNote({
  modalDeleteNote,
  changeStatusModal,
  submitModal,
  idNote,
}: IModalProps) {
  function changeModalState() {
    changeStatusModal();
  }

  return (
    <Modal
      isOpen={modalDeleteNote}
      size={['sm', '2xl']}
      onClose={() => {}}
      isCentered
    >
      <ModalOverlay backgroundColor={'rgba(0,0,0,0.4)'} />
      <ModalContent borderRadius="6" py="7" shadow={0}>
        <ModalHeader>
          <Text textAlign="center" fontSize={['28', '40']}>
            Deletar
          </Text>
          <Box
            borderBottomWidth={[0, 2]}
            borderColor="black.900"
            mx={['40']}
          ></Box>
        </ModalHeader>
        <ModalBody m="auto" pb="4" bg="white" borderRadius="6">
          <Text textAlign="center" fontSize={['17', '20']} px={['10', '16']}>
            Ao deletar não terá como recuperar a nota do dia 29, você acabara
            perdendo um dia!
          </Text>
          <Text
            textAlign="center"
            mt="4"
            fontSize={['17', '20']}
            textColor="red.900"
          >
            Deseja continuar?
          </Text>
          <Flex justify="space-between" mt="4" mx={['2', '10']}>
            <Button
              fontSize={['16', '20']}
              variant="unstyled"
              w={['24', '32']}
              borderRadius={0}
              backgroundColor="blue.400"
              _hover={{ backgroundColor: 'black.900', color: 'white' }}
              onClick={() => submitModal(idNote)}
            >
              Sim
            </Button>
            <Button
              fontSize={['16', '20']}
              variant="unstyled"
              w={['24', '32']}
              borderBottomWidth={2}
              borderColor="red.900"
              borderRadius={0}
              backgroundColor="red.100"
              _hover={{ backgroundColor: 'red.900', color: 'white' }}
              onClick={changeModalState}
            >
              Não
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

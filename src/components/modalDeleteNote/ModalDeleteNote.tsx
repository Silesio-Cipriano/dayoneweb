import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface IModalProps {
  modalDeleteNote: boolean;
  changeStatusModal: () => void;
  submitModal: (id: string) => void;
  idNote: string;
  day: number;
  loading: boolean;
}

export function ModalDeleteNote({
  modalDeleteNote,
  changeStatusModal,
  submitModal,
  idNote,
  day,
  loading,
}: IModalProps) {
  function changeModalState() {
    changeStatusModal();
  }

  return (
    <Modal
      isOpen={modalDeleteNote}
      size={['sm', 'xl']}
      onClose={() => {}}
      isCentered
    >
      <ModalOverlay backgroundColor={'rgba(0,0,0,0.4)'} />
      <ModalContent borderRadius="6" py="7" pb={10} mx="20" shadow={0}>
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
          <Text textAlign="center" fontSize={['17', '20']} px={['8', '16']}>
            Ao deletar não terá como recuperar a nota do dia {day}, você acabara
            perdendo um dia!
          </Text>

          <Flex justify="space-between" mt="4" mx={['2', '10']}>
            <Button
              fontSize={['16', '', '20']}
              variant="unstyled"
              w={['24', '24', '32', '44']}
              borderRadius={3}
              h={12}
              color="white"
              backgroundColor="red.900"
              _hover={{ backgroundColor: 'red.100', color: 'white' }}
              onClick={() => submitModal(idNote)}
              isDisabled={loading}
            >
              {!loading ? (
                <Text>Deletar</Text>
              ) : (
                <Spinner
                  size={['md', 'lg']}
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                />
              )}
            </Button>
            <Button
              fontSize={['16', '', '20']}
              variant="unstyled"
              w={['24', '24', '32', '44']}
              h={12}
              borderRadius={3}
              color="white"
              backgroundColor="black.900"
              _hover={{ backgroundColor: 'black.100', color: 'white' }}
              onClick={changeModalState}
              isDisabled={loading}
            >
              Cancelar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

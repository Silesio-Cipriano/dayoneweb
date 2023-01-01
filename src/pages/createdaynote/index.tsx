import {
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MyDayCard } from '../../components/DayCards/MyDayCard';
import { Header } from '../../components/Header';
import { TitleArea } from '../../components/TitleArea';
import { emojiData } from '../../utils/data';
import Emoji from '../../assets/EmojiVendeta.svg';
import { ReactNode, useState } from 'react';

interface IEmojiProps {
  id: number;
  emoji: any;
}
export default function CreateDayNote() {
  const data: IEmojiProps[] = emojiData;
  const [modalVisible, setModalVisible] = useState(false);
  const [emoji, setEmoji] = useState<IEmojiProps>(data[data.length - 1]);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
  const sizeEmoji = [12, 16, 24];

  function modalVisibleStatus() {
    setModalVisible(!modalVisible);
  }
  function changeStatus(id: number) {
    let emo = data[id];
    setEmoji(emo);
    modalVisibleStatus();
  }

  return (
    <>
      <Header variant="logged" />
      <Flex w="100%" maxWidth={1480} mx="auto" flexDir="column" px="4">
        <Flex
          w="100%"
          maxWidth={1080}
          mx="auto"
          flexDir="column"
          gap={['10', '6']}
        >
          <Flex justify="space-between" align="center" mt="20">
            <Heading>Criar nota diaria</Heading>
            <Button
              w={[124, 255]}
              h={[10, 50]}
              variant="outline"
              borderRadius="full"
              border="2px"
              colorScheme="black.900"
              _hover={{ bg: 'black.900', color: 'white', border: '2px' }}
              fontSize={['xs', 'xl']}
            >
              Salvar
            </Button>
          </Flex>

          <Textarea
            fontSize={20}
            placeholder="Frase do dia"
            variant="filled"
            resize="none"
            bg="blue.400"
          />
          <Flex gap="16" w="100%" justify="space-between">
            <Input
              fontSize={20}
              placeholder="Autor da frase"
              variant="filled"
              h={16}
              bg="blue.400"
            />
            <Button bg="blue.400" h={16} w={284} onClick={modalVisibleStatus}>
              <Image src={emoji.emoji} w={68} />
            </Button>
          </Flex>
          <Textarea
            fontSize={20}
            placeholder="Escrever"
            variant="filled"
            resize="none"
            h={328}
            bg="blue.400"
          />
        </Flex>
      </Flex>

      <Modal
        isOpen={modalVisible}
        size={[sizes[1], sizes[4]]}
        onClose={() => {
          modalVisibleStatus;
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Status</ModalHeader>
          <ModalCloseButton onClick={modalVisibleStatus} />
          <ModalBody pb="10" m="auto" w="100%">
            <Grid
              templateColumns={['repeat(4, 1fr)']}
              gap={[6, 10]}
              alignItems="center"
              ml="2"
            >
              {data.map((Emoji) => {
                return (
                  <Button
                    h="max-content"
                    w="max-content"
                    bg="none"
                    variant="unstyled"
                    onClick={() => changeStatus(Emoji.id)}
                  >
                    <Image src={Emoji.emoji} w={[sizeEmoji[1], sizeEmoji[2]]} />
                  </Button>
                );
              })}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

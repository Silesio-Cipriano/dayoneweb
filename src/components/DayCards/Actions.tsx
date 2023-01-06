import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';
import { Edit2, Heart, MessageCircle, Share2, X } from 'react-feather';
interface ActionsProps {
  likes: number;
  numberOfComments: number;
  variantComponent?: 'normal' | 'your' | 'other';
  deleteModal: () => void;
  idNote: string;
}
export function Actions({
  variantComponent,
  likes,
  numberOfComments,
  deleteModal,
  idNote,
}: ActionsProps) {
  const [likeUpdate, setLikeUpdate] = useState(likes);
  const [liked, setLiked] = useState(false);

  function changeLike() {
    if (likes === likeUpdate) {
      setLikeUpdate(likes + 1);
      setLiked(true);
    } else {
      setLikeUpdate(likeUpdate - 1);
      setLiked(false);
    }
  }

  if (variantComponent === 'your') {
    return (
      <>
        <Flex align="center" justify="center" gap={[6, 8]} mt={[6, 4]}>
          {/* <Flex
            flexDir="column"
            align="center"
            w="78"
            h="78"
            justify="space-between"
          >
            <Button variant="unstyled" w="78" h="78">
              <Flex border={['1px', '2px']} borderRadius="full" p={[2, 4]}>
                <Icon
                  as={Share2}
                  boxSize={[6, 8]}
                  strokeWidth="1"
                  color="black.900"
                />
              </Flex>
            </Button>
          </Flex> */}

          <Flex
            flexDir="column"
            align="center"
            w="78"
            h="78"
            justify="space-between"
          >
            <Button variant="unstyled" w="78" h="78">
              <Link
                href={{ pathname: '/editdaynote', query: { nxiu6s: idNote } }}
              >
                <Flex border={['1px', '2px']} borderRadius="full" p={[2, 4]}>
                  <Icon
                    as={Edit2}
                    boxSize={[6, 8]}
                    strokeWidth="1"
                    color="black.900"
                  />
                </Flex>
              </Link>
            </Button>
          </Flex>

          <Flex
            flexDir="column"
            align="center"
            w="78"
            h="78"
            justify="space-between"
          >
            <Button variant="unstyled" w="78" h="78" onClick={deleteModal}>
              <Flex border={['1px', '2px']} borderRadius="full" p={[2, 4]}>
                <Icon
                  as={X}
                  boxSize={[6, 8]}
                  strokeWidth="1"
                  color="black.900"
                />
              </Flex>
            </Button>
          </Flex>
        </Flex>
        {/* Comment */}
        {/* <Center>
          <Link href="/">
            <Flex flexDir="column" justify="space-between" mt={['1', '10']}>
              <Text fontSize={[14, 20]} fontWeight="bold" textAlign="center">
                20 comentarios
              </Text>
            </Flex>
          </Link>
        </Center> */}
      </>
    );
  }
  if (variantComponent === 'other') {
    return (
      <Flex align="end" justify="center" gap={[12, 16]} mt={[6, 4]}>
        <Link href="/">
          <Flex w="78" h="78" flexDir="column" justify="space-between">
            <Flex textAlign="center" pb={[1, 3]}>
              <Flex border={['1px', '2px']} borderRadius="full" p={[2, 4]}>
                <Icon as={MessageCircle} boxSize={[6, 8]} strokeWidth="1.5" />
              </Flex>
            </Flex>
            <Text fontSize={20} fontWeight="bold" textAlign="center">
              {/* {numberOfComments} */}
            </Text>
          </Flex>
        </Link>
      </Flex>
    );
  }
  return (
    <Flex align="end" justify="center" gap={[12, 16]} mt={[6, 4]}>
      <Flex
        flexDir={['row', 'column']}
        align="center"
        justify="space-between"
        gap={['2', '4']}
      >
        <Button
          variant="outline"
          w={[12, 20]}
          h={[12, 20]}
          borderRadius="full"
          borderColor={liked ? 'red' : '#E3E3E3'}
          onClick={changeLike}
        >
          <Icon
            as={Heart}
            border={1}
            boxSize={[6, 12]}
            strokeWidth="1"
            fill={liked ? 'red' : 'white'}
            stroke={liked ? 'none' : 'black.900'}
          />
        </Button>
        <Text
          fontSize={20}
          fontWeight="bold"
          color={liked ? 'red' : 'black.900'}
        >
          {'' + likeUpdate + ''}
        </Text>
      </Flex>

      <Link href="/">
        <Flex
          flexDir={['row', 'column']}
          align="center"
          justify="space-between"
          gap={['2', '4']}
        >
          <Button
            variant="outline"
            w={[12, 20]}
            h={[12, 20]}
            borderRadius="full"
            borderColor={'#E3E3E3'}
          >
            <Icon
              as={MessageCircle}
              border={1}
              boxSize={[6, 12]}
              strokeWidth="1"
            />
          </Button>
          <Text fontSize={20} fontWeight="bold">
            {numberOfComments + ''}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}

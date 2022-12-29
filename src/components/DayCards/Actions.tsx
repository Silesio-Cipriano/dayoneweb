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
}
export function Actions({
  variantComponent,
  likes,
  numberOfComments,
}: ActionsProps) {
  if (variantComponent === 'your') {
    return (
      <>
        <Flex align="center" justify="center" gap={[6, 8]} mt={[6, 4]}>
          <Flex
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
          </Flex>

          <Flex
            flexDir="column"
            align="center"
            w="78"
            h="78"
            justify="space-between"
          >
            <Button variant="unstyled" w="78" h="78">
              <Link href="/MyNotes">
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
            <Button variant="unstyled" w="78" h="78">
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
        <Center>
          <Link href="/">
            <Flex flexDir="column" justify="space-between" mt={['1', '10']}>
              <Text fontSize={[14, 20]} fontWeight="bold" textAlign="center">
                20 comentarios
              </Text>
            </Flex>
          </Link>
        </Center>
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
      <Flex flexDir="column" align="center" justify="space-between">
        <Button
          variant="outline"
          w={[12, 20]}
          h={[12, 20]}
          borderRadius="full"
          width="20"
        >
          <Icon
            as={Heart}
            border={1}
            boxSize={[6, 12]}
            strokeWidth="1"
            fill="red"
            stroke="none"
          />
        </Button>
        <Text fontSize={20} fontWeight="bold">
          {'' + likes + ''}
        </Text>
      </Flex>

      <Link href="/">
        <Flex flexDir="column" align="center" justify="space-between">
          <Button
            variant="outline"
            w={[12, 20]}
            h={[12, 20]}
            borderRadius="full"
            width="20"
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

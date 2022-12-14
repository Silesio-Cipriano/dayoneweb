import { Flex, Text } from '@chakra-ui/react';

interface Title {
  title: string;
  authorTitle: string;
  createdAt?: string;
  variantComponent?: 'normal' | 'your';
  index: number;
}
export function Title({
  variantComponent,
  title,
  authorTitle,
  createdAt,
  index,
}: Title) {
  if (variantComponent === 'your') {
    return (
      <Flex
        align={['center', 'start']}
        mt={['2', '10']}
        justify={['center', 'space-between']}
        flexDir={['column-reverse', 'row']}
      >
        <Flex w="100%" flexDir="column" maxWidth={912}>
          <Text
            fontSize={[16, 28]}
            fontWeight="bold"
            textAlign={['center', 'start']}
            mt={[4, 0]}
          >
            "{title}"
          </Text>
          <Text
            mt="4"
            mb="10"
            fontSize={[14, 20]}
            fontWeight="thin"
            textAlign={['center', 'start']}
            fontFamily="Nunito"
          >
            — {authorTitle} —
          </Text>
        </Flex>
        <Text fontSize={[16, 24]}>
          Dia {index} - {createdAt}
        </Text>
      </Flex>
    );
  }
  return (
    <Flex w="100%" flexDir="column" mt={['4', '10']} maxWidth={912}>
      <Text
        fontSize={[16, 28]}
        fontWeight="bold"
        textAlign={['center', 'start']}
      >
        "{title}"
      </Text>
      <Text
        mt="4"
        mb="10"
        fontSize={[14, 20]}
        fontWeight="thin"
        textAlign={['center', 'start']}
      >
        — {authorTitle} —
      </Text>
    </Flex>
  );
}

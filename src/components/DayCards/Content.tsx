import { Flex, Image } from '@chakra-ui/react';

interface ContentProps {
  description: string;
  emoji: string;
}
export function Content({ description, emoji }: ContentProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      flexDir={['column-reverse', 'row']}
    >
      <Flex
        as="h1"
        maxWidth={998}
        fontSize={[16, 24]}
        fontWeight="medium"
        fontFamily="Nunito"
        textAlign={['center', 'start']}
        mt={['2', '0']}
      >
        {description}
      </Flex>
      <Flex>
        <Image src={emoji} w={[20, 32]} />
      </Flex>
    </Flex>
  );
}

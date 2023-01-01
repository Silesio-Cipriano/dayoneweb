import { Flex, Image } from '@chakra-ui/react';

interface ContentProps {
  description: string;
}
export function Content({ description }: ContentProps) {
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
        textAlign={['center', 'start']}
      >
        {description}
      </Flex>
      <Flex>
        <Image src="/images/EmojiVendeta.svg" w={[20, 32]} />
      </Flex>
    </Flex>
  );
}

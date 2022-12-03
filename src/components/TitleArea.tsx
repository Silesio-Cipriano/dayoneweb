import { Divider, Flex, Text, Input, Button } from '@chakra-ui/react';

interface TitleAreaProps {
  type?: number;
}
export function TitleArea({ type }: TitleAreaProps) {
  if (type === 1) {
    return (
      <Flex flexDir="column" w="100%">
        <Flex w="100%" mx="auto" align="center" justifyContent="space-between">
          <Text fontFamily="Lato" fontSize={[32, 46, 76]} fontWeight="bold">
            Day card
          </Text>

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
            Criar
          </Button>
        </Flex>
        <Divider borderWidth={1.2} mt={['2', '5']} />
      </Flex>
    );
  }
  return (
    <Flex flexDir="column" w="100%">
      <Flex w="100%" mx="auto" align="center" justifyContent="space-between">
        <Text fontFamily="Lato" fontSize={[32, 46, 76]} fontWeight="bold">
          Feed
        </Text>
        <Input
          placeholder="Pesquisar por nome"
          variant="flushed"
          w={[245, 300]}
          fontSize={24}
          pl="2"
          _placeholder={{ fontSize: 18 }}
        />
      </Flex>
      <Divider borderWidth={1.2} mt={['2', '5']} />
    </Flex>
  );
}

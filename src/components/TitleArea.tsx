import { Divider, Flex, Text, Input, Button, Image } from '@chakra-ui/react';

interface TitleAreaProps {
  variantComponent?: 'normal' | 'user' | 'other';
}
export function TitleArea({ variantComponent }: TitleAreaProps) {
  if (variantComponent === 'user') {
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
  if (variantComponent === 'other') {
    return (
      <Flex flexDir="column" w="100%">
        <Flex w="100%" mx="auto" align="center" justifyContent="space-between">
          <Flex align="center" gap={['2', '10']}>
            <Image
              w={[14, 20]}
              h={[14, 20]}
              objectFit="cover"
              borderRadius="full"
              src="https://images.pexels.com/photos/14156051/pexels-photo-14156051.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            />
            <Text fontFamily="Lato" fontSize={[16, 36]} fontWeight="bold">
              Courtney Henry
            </Text>
          </Flex>
          <Input
            placeholder="Pesquisar por nome"
            variant="flushed"
            w={[190, 300]}
            fontSize={[16, 24]}
            pl="2"
            _placeholder={{ fontSize: 14 }}
          />
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

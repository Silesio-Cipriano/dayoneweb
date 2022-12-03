import { Button, Flex, Icon, Image, Link } from '@chakra-ui/react';
import { Bell } from 'react-feather';

interface HeaderProps {
  type?: number;
}

export function Header({ type }: HeaderProps) {
  if (type === 1) {
    return (
      <Flex
        as="header"
        w="100%"
        maxWidth={1480}
        h="20"
        px="4"
        mx="auto"
        mt="10"
        justify="space-between"
        align="center"
      >
        <Link fontSize={['2xl', '3xl']} fontWeight="bold" fontFamily="Lato">
          Day One
        </Link>

        <Flex justify="space-between" gap="2">
          <Button
            variant="solid"
            colorScheme="none"
            onClick={() => console.log('Hi')}
          >
            <Icon
              as={Bell}
              boxSize={[6, 10]}
              strokeWidth="1"
              color="black.900"
            />
          </Button>
          <Button variant="solid" colorScheme="none">
            <Image
              src="https://images.pexels.com/photos/6964748/pexels-photo-6964748.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              width={[14, 20]}
              height={[14, 16]}
              objectFit="cover"
              borderRadius={10}
            />
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      px="4"
      mx="auto"
      mt="10"
      justify="space-between"
      align="center"
    >
      <Link fontSize={['2xl', '3xl']} fontWeight="bold" fontFamily="Lato">
        Day One
      </Link>

      <Flex justify="space-between" gap="10">
        <Link fontSize={['xl', '2xl']} fontWeight="bold" fontFamily="Lato">
          Entrar
        </Link>

        <Link fontSize={['xl', '2xl']} fontWeight="bold" fontFamily="Lato">
          Cadastrar
        </Link>
      </Flex>
    </Flex>
  );
}

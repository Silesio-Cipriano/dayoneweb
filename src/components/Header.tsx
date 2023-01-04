import {
  Button,
  Flex,
  Icon,
  Image,
  Link as ChakraUILink,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Bell } from 'react-feather';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userAcronim } from '../utils/userAcronim';

interface HeaderProps {
  variant?: 'normal' | 'logged';
}

export function Header({ variant = 'normal' }: HeaderProps) {
  const { user, signOut } = useContext(AuthContext);

  if (variant === 'logged') {
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
        <ChakraUILink
          as={Link}
          href="/"
          fontSize={['2xl', '3xl']}
          fontWeight="bold"
          fontFamily="Lato"
          _hover={{ textDecoration: 'none' }}
        >
          Day One
        </ChakraUILink>

        <Flex justify="space-between" gap="2" alignItems="center">
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
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button padding="0" w="auto">
                {user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    width={[14, 16]}
                    height={[12, 14]}
                    objectFit="cover"
                    borderRadius={4}
                  />
                ) : (
                  <Text fontSize={[20, 24]} padding={['2', '6']}>
                    {userAcronim(user?.name + '')}
                  </Text>
                )}
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent w={['38', '44']} mt={['1', '2']} shadow={'md'}>
                <PopoverHeader>
                  <ChakraUILink
                    as={Link}
                    href="/mydaynotes"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Text fontSize={['16', '20']} fontFamily="Lato">
                      Minhas notas
                    </Text>
                  </ChakraUILink>
                </PopoverHeader>
                <PopoverBody>
                  <Flex direction="column" gap="2">
                    <ChakraUILink
                      as={Link}
                      href="/createdaynote"
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Text fontSize={['16', '20']} fontFamily="Lato">
                        Criar nota diaria
                      </Text>
                    </ChakraUILink>
                    <ChakraUILink
                      as={Link}
                      href="/myprofile"
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Text fontSize={['16', '20']} fontFamily="Lato">
                        Editar perfil
                      </Text>
                    </ChakraUILink>
                  </Flex>
                </PopoverBody>
                <PopoverFooter>
                  <Button
                    variant="unstyled"
                    paddingLeft="0"
                    onClick={() => signOut()}
                  >
                    <Text
                      fontSize={['16', '20']}
                      fontFamily="Lato"
                      color="red.900"
                    >
                      Sair
                    </Text>
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
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
      <ChakraUILink
        as={Link}
        href=""
        fontSize={['2xl', '3xl']}
        fontWeight="bold"
        fontFamily="Lato"
        _hover={{ textDecoration: 'none' }}
      >
        Day One
      </ChakraUILink>

      <Flex justify="space-between" gap="10">
        <ChakraUILink
          as={Link}
          href="/signUp"
          fontSize={['xl', '2xl']}
          fontWeight="bold"
          fontFamily="Lato"
          _hover={{ textDecoration: 'none' }}
        >
          Entrar
        </ChakraUILink>

        <ChakraUILink
          as={Link}
          href="/signUp"
          fontSize={['xl', '2xl']}
          fontWeight="bold"
          fontFamily="Lato"
          _hover={{ textDecoration: 'none', color: 'red.100' }}
        >
          Cadastrar
        </ChakraUILink>
      </Flex>
    </Flex>
  );
}

import { Flex, FormLabel, Input, InputProps } from '@chakra-ui/react';

interface InputFormProps extends InputProps {
  label: string;
  name: string;
}
export function InputForm({ label, name, ...rest }: InputFormProps) {
  return (
    <Flex
      flexDir="column"
      bg="blue.400"
      w="100%"
      py="2"
      px="4"
      borderRadius="4"
      justify="space-around"
    >
      <FormLabel htmlFor="nome" fontSize={[14, 20]} color="blue.100">
        {label}
      </FormLabel>
      <Input
        {...rest}
        name={name}
        id={name}
        variant="unstyled"
        h={['xl']}
        fontSize={[20, 24]}
      />
    </Flex>
  );
}

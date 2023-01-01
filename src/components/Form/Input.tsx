import { Flex, FormLabel, Input, InputProps } from '@chakra-ui/react';
import React from 'react';

interface InputFormProps extends InputProps {
  label: string;
  name: string;
}

export const InputForm = React.forwardRef(
  (
    { label, name, ...rest }: InputFormProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
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
          ref={ref}
          name={name}
          id={name}
          variant="unstyled"
          h={['xl']}
          fontSize={[20, 24]}
        />
      </Flex>
    );
  }
);

import { Flex, Text, Image } from '@chakra-ui/react';
import Link from 'next/link';

interface TopProps {
  autor: string;
  createdAt: string;
}
export function Top({ autor, createdAt }: TopProps) {
  return (
    <Flex w="100%" justify="space-between" align="center">
      <Link href="" className="">
        <Flex align="center" gap="6">
          <Image
            src="https://images.pexels.com/photos/14156051/pexels-photo-14156051.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
            objectFit="cover"
            width={[14, 20]}
            height={[14, 20]}
            border="1px"
            borderRadius="full"
          />
          <Text fontSize={[16, 28]} fontWeight="bold" fontFamily="Lato">
            {autor}
          </Text>
        </Flex>
      </Link>

      <Text fontSize={[14, 24]}>{createdAt}</Text>
    </Flex>
  );
}

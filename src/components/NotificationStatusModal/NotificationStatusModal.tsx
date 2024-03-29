import {
  AlertDialog,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { AlertOctagon, AlertTriangle, CheckCircle, X } from 'react-feather';

interface NotificationStatusModalProps {
  title: string;
  description: string;
  icon?: any;
  variant?: 'Sucess' | 'Warning' | 'Error';
  open: boolean;
  close: () => void;
}

export function NotificationStatusModal({
  title,
  description,
  icon,
  variant,
  open,
  close,
}: NotificationStatusModalProps) {
  let colorPrimary = 'green.100';
  let colorSecondary = 'green.900';
  let iconAlert = icon;

  if (variant === 'Error') {
    colorPrimary = '#FCEDEA';
    colorSecondary = '#FF0000';
    iconAlert = AlertTriangle;
  }

  if (variant === 'Sucess') {
    colorPrimary = 'green.100';
    colorSecondary = 'green.900';
    iconAlert = CheckCircle;
  }

  if (variant === 'Warning') {
    colorPrimary = '#FEF7EA';
    colorSecondary = '#EF9400';
    iconAlert = AlertOctagon;
  }

  return (
    <Modal isOpen={open} size={['sm', 'xl']} onClose={close}>
      <ModalOverlay />
      <ModalContent
        mx={['6', '24']}
        bgColor={colorPrimary}
        borderWidth={1}
        borderColor={colorSecondary}
      >
        <ModalHeader pb="0">
          <Flex align={['center']} justify="space-between">
            <Flex align={'center'} gap="2">
              <Icon as={iconAlert} color={colorSecondary} />
              <Text color={colorSecondary} fontSize={[14, 20]}>
                {title}
              </Text>
            </Flex>
            <Button
              onClick={close}
              data-group
              variant={'ghost'}
              _hover={{ bgColor: colorSecondary }}
              h="10"
              pb="0"
            >
              <Icon
                as={X}
                color={colorSecondary}
                _groupHover={{ color: 'white' }}
                fontSize={['14', '20']}
              />
            </Button>
          </Flex>
        </ModalHeader>
        <ModalBody pb="6" mt="0" pt="0">
          <Flex pl="7" flexDir="column" gap="1">
            <Text fontSize={['14', '20']}>{description}</Text>
            <Text fontSize={['14', '20']} color="#9D9D9D">
              {`${new Date().toLocaleTimeString()}`}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

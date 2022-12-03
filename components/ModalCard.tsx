import React, {useEffect} from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Stack,
  Checkbox,
  Spacer,
  Button,
  Icon,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  extendTheme,
} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";

const ModalCard = ({header, body, footer, open, components, modal}: any) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [modal]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={mainStyles.chatCardSecondBGColor} color="white">
          {header}
        </ModalHeader>
        <ModalCloseButton color="white" mt={2} _hover={{bg: "gray"}} />
        <ModalBody bg={mainStyles.chatCardSecondBGColor}>
          <Flex direction="column">
            <Text color="white" textAlign="justify" fontSize="18px">
              {body}
            </Text>
            {components}
          </Flex>
        </ModalBody>

        <ModalFooter bg={mainStyles.chatCardSecondBGColor}>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCard;

import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FiSend} from "react-icons/fi";
import {mainStyles} from "./LayoutCard";

export const InputChat = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: any) => setMessage(e.target.value);

  return (
    <Flex justify="space-between" w="100%" py={3}>
      <InputGroup>
        <Input
          placeholder="Type a message....."
          borderColor="white"
          focusBorderColor={mainStyles.chatInputBorderColor}
          autoComplete="off"
          color="white"
          onChange={handleMessageChange}
        ></Input>
        <InputRightElement
          children={<Icon as={FiSend} color="white" boxSize="20px"></Icon>}
        />
      </InputGroup>

      <Flex align="center"></Flex>
    </Flex>
  );
};

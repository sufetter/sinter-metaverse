import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Icon,
  Box,
  Image,
} from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import {
  HiOutlineEmojiHappy,
  HiOutlineMicrophone,
  HiOutlinePaperClip,
} from "react-icons/hi";
import {mainStyles} from "./LayoutCard";

export const InputChat = () => {
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState();
  const [display, setDisplay] = useState("none");

  const onEmojiClick = ({event, emojiObject}: any) => {
    setEmoji(emojiObject);
  };

  const handleMessageChange = (e: any) => setMessage(e.target.value);

  return (
    <Flex justify="space-between" w="100%" align="center">
      <Flex align="center">
        <Icon
          as={HiOutlinePaperClip}
          color={mainStyles.mainIconColor}
          boxSize="23px"
          _hover={{cursor: "pointer"}}
        />
      </Flex>
      <InputGroup px={2}>
        <Input
          placeholder="Type a message....."
          border="1px solid"
          borderColor={mainStyles.chatInputBorderColor}
          _focus={{borderWidth: "1px"}}
          focusBorderColor={mainStyles.chatInputBorderColor}
          autoComplete="off"
          color="white"
          onChange={handleMessageChange}
          _hover={{borderColor: mainStyles.chatInputBorderColor}}
        ></Input>
        <InputRightElement
          pr={3}
          children={
            <Icon
              as={HiOutlineEmojiHappy}
              color={mainStyles.mainIconColor}
              boxSize="25px"
              onClick={() => setDisplay("block")}
              _hover={{cursor: "pointer"}}
            />
          }
        />
      </InputGroup>

      <Flex align="center">
        <Icon
          as={HiOutlineMicrophone}
          color={mainStyles.mainIconColor}
          boxSize="23px"
          _hover={{cursor: "pointer"}}
        />
      </Flex>
    </Flex>
  );
};

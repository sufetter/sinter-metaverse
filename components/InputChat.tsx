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
import {FiSend} from "react-icons/fi";
import {HiOutlineEmojiHappy, HiOutlinePaperClip} from "react-icons/hi";
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
          children={
            <Icon
              as={HiOutlineEmojiHappy}
              color="white"
              boxSize="25px"
              onClick={() => setDisplay("block")}
              _hover={{cursor: "pointer"}}
            />
          }
        />
      </InputGroup>

      <Flex align="center" pl={2}>
        <Icon
          as={HiOutlinePaperClip}
          color="white"
          boxSize="23px"
          _hover={{cursor: "pointer"}}
        />
      </Flex>
    </Flex>
  );
};

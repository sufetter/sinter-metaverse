import {
  Flex,
  Text,
  Avatar,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import React from "react";
import {BiSearchAlt2} from "react-icons/bi";

export const ChatItem = () => {
  return (
    <Flex
      align="center"
      p="2"
      _hover={{bg: "#C1402F", cursor: "pointer"}}
      w="100%"
    >
      <Avatar src="" />
      <Text ms={3} color="white">
        User
      </Text>
    </Flex>
  );
};

export const ChatSearch = () => {
  return (
    <InputGroup>
      <InputRightElement
        pointerEvents="none"
        children={<BiSearchAlt2 color="white" size="20px" />}
      />
      <Input type="tel" placeholder="Search Chat" />
    </InputGroup>
  );
};

const ChatList = () => {
  return (
    <Flex flex={0.4} direction="column">
      <ChatSearch />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </Flex>
  );
};
export default ChatList;

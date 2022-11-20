import {
  Flex,
  Text,
  Avatar,
  InputGroup,
  InputRightElement,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import {BiSearchAlt2} from "react-icons/bi";
import {mainStyles} from "./LayoutCard";

export const ChatItem = () => {
  return (
    <Flex
      align="center"
      p="2"
      _hover={{bg: mainStyles.chatListItemHover, cursor: "pointer"}}
      w="100%"
      px={3}
      py={2}
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
    <Flex
      px={3}
      h="55px"
      align="center"
      borderBottom="3px solid"
      borderColor={mainStyles.chatInputBorderColor}
    >
      <InputGroup size="sm">
        <InputRightElement
          pointerEvents="none"
          children={<BiSearchAlt2 color="white" size="18px" />}
        />
        <Input
          type="tel"
          color="white"
          placeholder="Search"
          borderRadius="5px"
        />
      </InputGroup>
    </Flex>
  );
};

const ChatList = () => {
  return (
    <Flex
      flex={0.5}
      direction="column"
      borderEnd="3px solid"
      borderColor={mainStyles.chatListBorderColor}
    >
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

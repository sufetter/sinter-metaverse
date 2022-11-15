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
import {mainStyles} from "./LayoutCard";

export const ChatItem = () => {
  return (
    <Flex
      align="center"
      p="2"
      _hover={{bg: mainStyles.chatListItemHober, cursor: "pointer"}}
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
    <Flex p={3}>
      <InputGroup>
        <InputRightElement
          pointerEvents="none"
          children={<BiSearchAlt2 color="white" size="20px" />}
        />
        <Input type="tel" placeholder="Search Chat" />
      </InputGroup>
    </Flex>
  );
};

const ChatList = () => {
  return (
    <Flex
      flex={0.4}
      direction="column"
      borderEnd="2px solid"
      borderColor={"#534E93"}
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

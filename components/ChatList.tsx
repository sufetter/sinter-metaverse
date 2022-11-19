import {
  Flex,
  Text,
  Avatar,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import React from "react";
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

const ChatList = () => {
  return (
    <Flex
      flex={0.4}
      direction="column"
      borderEnd="2px solid"
      borderColor={mainStyles.chatListBorderColor}
    >
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

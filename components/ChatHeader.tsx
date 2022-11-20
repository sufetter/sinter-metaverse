import React from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  Heading,
  Text,
} from "@chakra-ui/react";
import {BiSearchAlt2} from "react-icons/bi";
import {mainStyles} from "./LayoutCard";

export const ChatSearch = () => {
  return (
    <Flex p={3} align="center" flex={0.4}>
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

export const TopBarChat = () => {
  return (
    <Flex w="100%" h="81px" align="center" flex={1} px="40px">
      <Avatar src="" marginEnd={3}></Avatar>
      <Heading color="white">user@fisting.com</Heading>
    </Flex>
  );
};
const ChatHeader = () => {
  return (
    <Flex
      w="100%"
      borderBottom="2px solid"
      borderColor={mainStyles.chatListBorderColor}
    >
      <ChatSearch />
      <TopBarChat />
    </Flex>
  );
};

export default ChatHeader;

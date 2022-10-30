import {Flex, Avatar, Heading, Spacer} from "@chakra-ui/react";
import React from "react";
import {InputChat} from "../components/InputChat";
import {MessageChat} from "./MessageChat";

export const TopBarChat = () => {
  return (
    <Flex w="100%" h="81px" align="center" p={5}>
      <Avatar src="" marginEnd={3}></Avatar>
      <Heading color="white">user@fisting.com</Heading>
    </Flex>
  );
};

export const BottomBarChat = () => {
  return (
    <Flex>
      <InputChat />
    </Flex>
  );
};

export const MainChat = () => {
  return (
    <Flex h="100vh" w="100%" direction="column">
      <TopBarChat />
      <Flex
        flex={1}
        direction="column"
        overflowY="scroll"
        sx={{scrollbarWidth: "none"}}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: "30px",
          },
        }}
      >
        <MessageChat type="send" />
        <MessageChat type="get" />
        <MessageChat type="send" />
        <MessageChat type="get" />
        <MessageChat type="send" />
        <MessageChat type="get" />
        <MessageChat type="send" />
        <MessageChat type="get" />
        <MessageChat type="send" />
        <MessageChat type="get" />
        <MessageChat type="send" />
        <MessageChat type="get" />
        <MessageChat type="send" />
        <MessageChat type="get" />
        <MessageChat type="send" />
        <MessageChat type="get" />
      </Flex>
      <BottomBarChat />
    </Flex>
  );
};

import {Flex, Avatar, Heading, Spacer} from "@chakra-ui/react";
import React from "react";
import {InputChat} from "../components/InputChat";
import {MessageChat} from "./MessageChat";
import {mainStyles} from "./LayoutCard";

export const TopBarChat = () => {
  return (
    <Flex w="100%" h="81px" align="center" p={5} pt={0}>
      <Avatar src="" marginEnd={3}></Avatar>
      <Heading color="white" p={0}>
        user@fisting.com
      </Heading>
    </Flex>
  );
};

export const BottomBarChat = () => {
  return (
    <Flex px={4}>
      <InputChat />
    </Flex>
  );
};

export const MainChat = () => {
  return (
    <Flex
      flex={1}
      w="100%"
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
      <TopBarChat />
      <Flex
        flex={1}
        px={10}
        direction="column-reverse"
        overflowY="scroll"
        height="100px"
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

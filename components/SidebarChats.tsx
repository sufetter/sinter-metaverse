import {ArrowLeftIcon} from "@chakra-ui/icons";
import {Avatar, Button, Flex, IconButton, Spacer, Text} from "@chakra-ui/react";
import React from "react";

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

export const SidebarChats = () => {
  return (
    <Flex
      w="300px"
      bg=""
      borderEnd="1px solid"
      borderColor={"#C1402F"}
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
      <Flex
        w="100%"
        h="81px"
        align="center"
        justify="space-between"
        p={2}
        borderBottom="1px solid"
        borderColor={"#C1402F"}
      >
        <Flex align="center">
          <Avatar src="" />
          <Text color="white" px={3}>
            Aboba
          </Text>
        </Flex>

        <IconButton
          variant="outline"
          borderColor="#C1402F"
          aria-label=""
          icon={<ArrowLeftIcon boxSize={"10px"} color="#C1402F" />}
          boxSize="30px"
        ></IconButton>
      </Flex>
      <Button my={3} mx={2} variant="solid" bg="#C1402F">
        New Chat
      </Button>
      <Flex
        overflowY="scroll"
        direction="column"
        sx={{scrollbarWidth: "none"}}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: "30px",
          },
        }}
      >
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </Flex>
    </Flex>
  );
};

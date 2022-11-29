import {
  Flex,
  Avatar,
  Heading,
  Spacer,
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {InputChat} from "../components/InputChat";
import {MessageChat} from "./MessageChat";
import {mainStyles} from "./LayoutCard";
import {FiMoreHorizontal} from "react-icons/fi";
import {BiSearchAlt2} from "react-icons/bi";

export const TopBarChat = () => {
  let date = new Date();
  let displayTime: string = date.getHours() + ":" + date.getMinutes();
  return (
    <Flex
      w="100%"
      align="center"
      justify="space-between"
      p={2}
      px={4}
      h="50px"
      borderBottom="2px solid"
      borderColor={mainStyles.chatInputBorderColor}
      bg={mainStyles.chatCardSecondBGColor}
      borderRadius="0 9px 0 0"
    >
      <HStack align="center" spacing="10px">
        <Text
          color={mainStyles.chatHeaderTextColor}
          fontSize="16px"
          fontWeight="500"
          _hover={{cursor: "pointer"}}
        >
          Gigachad
        </Text>
        <Text color="white" fontSize="16">
          Last time online: {displayTime}
        </Text>
      </HStack>
      <HStack align="center" spacing="15px">
        <Icon
          as={BiSearchAlt2}
          color="white"
          boxSize="20px"
          _hover={{cursor: "pointer"}}
        />
        <Icon
          as={FiMoreHorizontal}
          color="white"
          boxSize="28px"
          _hover={{cursor: "pointer"}}
        />
        <Avatar src="" boxSize="33px" _hover={{cursor: "pointer"}}></Avatar>
      </HStack>
    </Flex>
  );
};

export const BottomBarChat = () => {
  return (
    <Flex
      px={4}
      bg={mainStyles.chatCardSecondBGColor}
      borderTop="1px solid"
      borderColor={mainStyles.chatInputBorderColor}
      borderRadius="0 0 9px 0"
      h="60px"
    >
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
        direction="column"
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

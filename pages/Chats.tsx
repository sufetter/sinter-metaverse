import {Box, ChakraProvider, Flex} from "@chakra-ui/react";
import React from "react";
import {MainChat} from "../components/MainChat";
import {SidebarChats} from "../components/SidebarMain";

const Chats: React.FC = () => {
  return (
    <ChakraProvider>
      <Flex overflow="hidden" flex={1} bg="#030812">
        <SidebarChats />
        <MainChat />
      </Flex>
    </ChakraProvider>
  );
};

export default Chats;

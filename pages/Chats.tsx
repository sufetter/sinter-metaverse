import {Box, ChakraProvider, Flex} from "@chakra-ui/react";
import React from "react";
import {MainChat} from "../components/MainChat";
import {SidebarChats} from "../components/SidebarChats";

const Chats: React.FC = () => {
  return (
    <ChakraProvider>
      <Flex bg="#030812">
        <SidebarChats />
        <MainChat />
      </Flex>
    </ChakraProvider>
  );
};

export default Chats;

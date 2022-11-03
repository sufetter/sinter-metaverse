import {Avatar, Box, ChakraProvider, Flex} from "@chakra-ui/react";
import React from "react";
import {MainChat} from "../../components/MainChat";
import {SidebarChats} from "../../components/SidebarChats";

const id: React.FC = () => {
  return (
    <ChakraProvider>
      <Flex bg="#030812" maxHeight="100vh" overflowY="hidden">
        <SidebarChats />
        <MainChat />
      </Flex>
    </ChakraProvider>
  );
};

export default id;

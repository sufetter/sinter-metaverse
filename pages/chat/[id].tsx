import {Avatar, Box, ChakraProvider, Flex} from "@chakra-ui/react";
import React from "react";
import {MainChat} from "../../components/MainChat";
import {SidebarChats} from "../../components/SidebarChats";

const id: React.FC = () => {
  return (
    <ChakraProvider>
      <Flex overflow="hidden" bg="#030812">
        <SidebarChats />
        <MainChat />
      </Flex>
    </ChakraProvider>
  );
};

export default id;

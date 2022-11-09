import {Avatar, Box, ChakraProvider, Flex} from "@chakra-ui/react";
import React from "react";
import LayoutMain from "../../components/LayoutMain";
import {MainChat} from "../../components/MainChat";
import {SidebarChats} from "../../components/SidebarChats";

const id: React.FC = () => {
  return (
    <LayoutMain height="100vh">
      <ChakraProvider>
        <Flex bg="#030812" align="stretch" overflowY="hidden">
          <SidebarChats />
          <MainChat />
        </Flex>
      </ChakraProvider>
    </LayoutMain>
  );
};

export default id;

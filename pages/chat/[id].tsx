import {Avatar, Box, ChakraProvider, Flex} from "@chakra-ui/react";
import React from "react";
import LayoutCard from "../../components/LayoutCard";
import {MainChat} from "../../components/MainChat";
import {SidebarChats} from "../../components/SidebarChats";

const id: React.FC = () => {
  return (
    <LayoutCard style={{height: "100vh"}} main>
      <ChakraProvider>
        <Flex bg="#161517" align="stretch" overflowY="hidden">
          <SidebarChats />
          <MainChat />
        </Flex>
      </ChakraProvider>
    </LayoutCard>
  );
};

export default id;

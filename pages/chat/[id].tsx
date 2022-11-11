import {Avatar, Box, ChakraProvider, Flex} from "@chakra-ui/react";
import React from "react";
import LayoutCard from "../../components/LayoutCard";
import {MainChat} from "../../components/MainChat";
import {SidebarMain} from "../../components/SidebarMain";
import Sidebar from "../../components/Sidebar";
import {ChatSettings} from "../../components/ChatSettings";
import ChatList from "../../components/ChatList";

const id: React.FC = () => {
  return (
    <LayoutCard style={{height: "100vh"}} main>
      <ChakraProvider>
        <Flex bg="#161517" align="stretch" overflowY="hidden" h="100%">
          <Sidebar />
          <ChatList />
          <MainChat />
          <ChatSettings />
        </Flex>
      </ChakraProvider>
    </LayoutCard>
  );
};

export default id;

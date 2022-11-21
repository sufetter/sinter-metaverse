import React, {useContext} from "react";
import type {NextPage} from "next";
import LoginCard from "../components/loginCard";
import {ChakraProvider} from "@chakra-ui/react";
import LayoutCard from "../components/LayoutCard";

export default function login() {
  return (
    <LayoutCard card>
      <ChakraProvider>
        <LoginCard />
      </ChakraProvider>
    </LayoutCard>
  );
}

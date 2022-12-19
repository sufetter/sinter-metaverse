import React from "react";
import type {NextPage} from "next";
import {LoginCard} from "../components/Login";
import {ChakraProvider} from "@chakra-ui/react";
import {LayoutCard} from "../components/Layout";

export default function login() {
  return (
    <LayoutCard card>
      <ChakraProvider>
        <LoginCard />
      </ChakraProvider>
    </LayoutCard>
  );
}

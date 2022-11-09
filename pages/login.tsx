import React from "react";
import type {NextPage} from "next";
import LoginCard from "../components/loginCard";
import {ChakraProvider} from "@chakra-ui/react";
import LayoutCard from "../components/LayoutCard";

export default function login() {
  return (
    <LayoutCard>
      <ChakraProvider>
        <LoginCard />
      </ChakraProvider>
    </LayoutCard>
  );
}

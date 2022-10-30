import React from "react";
import type {NextPage} from "next";
import LoginCard from "../components/loginCard";
import {ChakraProvider} from "@chakra-ui/react";

export default function login() {
  return (
    <ChakraProvider>
      <LoginCard />
    </ChakraProvider>
  );
}

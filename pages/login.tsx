import React, {useContext} from "react";
import type {NextPage} from "next";
import LoginCard from "../components/loginCard";
import {ChakraProvider} from "@chakra-ui/react";
import LayoutCard from "../components/LayoutCard";
import {AuthContext} from "../context/AuthContext";

export default function login() {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  return (
    <LayoutCard card>
      <ChakraProvider>
        <LoginCard />
      </ChakraProvider>
    </LayoutCard>
  );
}

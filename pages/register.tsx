import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React from "react";
import {useState} from "react";
import {LayoutCard} from "../components/Layout";
import {RegisterCard} from "../components/Register";

const Register = () => {
  return (
    <LayoutCard card>
      <ChakraProvider>
        <RegisterCard />
      </ChakraProvider>
    </LayoutCard>
  );
};

export default Register;

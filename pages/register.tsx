import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React from "react";
import {useState} from "react";
import LayoutCard from "../components/LayoutCard";
import RegisterCard from "../components/RegisterCard";

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

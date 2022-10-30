import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import RegisterCard from "../components/RegisterCard";

const Register = () => {
  return (
    <ChakraProvider>
      <RegisterCard />
    </ChakraProvider>
  );
};

export default Register;

import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import LayoutCard from "../components/LayoutCard";
import ResetPasswordCard from "../components/ResetPasswordCard";

const reset = () => {
  return (
    <LayoutCard card>
      <ChakraProvider>
        <ResetPasswordCard />
      </ChakraProvider>
    </LayoutCard>
  );
};

export default reset;

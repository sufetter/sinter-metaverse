import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import {LayoutCard} from "../components/Layout";
import {ResetPasswordCard} from "../components/ResetPassword";

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

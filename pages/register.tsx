import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React from "react";
import {useState} from "react";
import LayoutCard from "../components/LayoutCard";
import RegisterCard from "../components/RegisterCard";

const Register = () => {
  const [progressColor, changeProgressColor] = useState<string>("red");
  function changeColor(color: string) {
    changeProgressColor(color);
  }
  const theme = extendTheme({
    colors: {
      progressColor: {
        500: progressColor,
      },
    },
  });
  return (
    <LayoutCard>
      <ChakraProvider theme={theme}>
        <RegisterCard
          changeProgressColor={(color: string) => {
            changeProgressColor(color);
            console.log(color);
          }}
        />
      </ChakraProvider>
    </LayoutCard>
  );
};

export default Register;

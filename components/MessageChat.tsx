import {Flex, Text} from "@chakra-ui/react";
import React from "react";

export interface StandardProps {
  type: string;
  children?: React.ReactNode;
}

export const MessageChat = ({children, type}: StandardProps) => {
  let mainColor;
  let position;
  if (type === "send") {
    mainColor = "#C1402F";
    position = "flex-start";
  } else if (type === "get") {
    mainColor = "#224957";
    position = "flex-end";
  }
  return (
    <Flex px={5} alignSelf={position}>
      <Text
        color="white"
        w="fit-content"
        bg={mainColor}
        px={3}
        py={2}
        borderRadius="5px"
        marginBottom={4}
      >
        Message
      </Text>
    </Flex>
  );
};

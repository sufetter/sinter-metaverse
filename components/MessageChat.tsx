import {Flex, Text} from "@chakra-ui/react";
import React from "react";
import {mainStyles} from "./LayoutCard";

export interface StandardProps {
  type: string;
  children?: React.ReactNode;
}
export const MessageChat = ({children, type}: StandardProps) => {
  let mainColor;
  let position;
  if (type === "send") {
    mainColor = mainStyles.sendMessages;
    position = "flex-start";
  } else if (type === "get") {
    mainColor = mainStyles.getMessages;
    position = "flex-end";
  }
  return (
    <Flex alignSelf={position}>
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

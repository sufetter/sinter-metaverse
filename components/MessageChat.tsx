import {Avatar, Flex, Text} from "@chakra-ui/react";
import React from "react";
import {mainStyles} from "./LayoutCard";

export interface StandardProps {
  type: string;
  children?: React.ReactNode;
}
export const MessageChat = ({children, type}: StandardProps) => {
  let position;
  let date = new Date();
  let displayTime: string = date.getHours() + ":" + date.getMinutes();

  return (
    <Flex alignSelf={position} direction="row" my={1.5}>
      <Flex direction="column">
        <Avatar src="" mr="10px" boxSize="40px" />
      </Flex>
      <Flex direction="column">
        <Flex direction="column">
          <Flex align="center">
            <Text
              color={mainStyles.messageTextColor}
              mr="10px"
              fontWeight={500}
              fontSize="14px"
            >
              User Name
            </Text>
            <Text
              color={mainStyles.secondTextColor}
              fontWeight={400}
              fontSize="14px"
            >
              {displayTime}
            </Text>
          </Flex>

          <Text
            color="white"
            w="fit-content"
            py={0.5}
            borderRadius="5px"
            textAlign="justify"
            fontSize="14px"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            tenetur sed quidem qui veniam aliquid, cum obcaecati soluta facere,
            maxime nobis dicta accusantium accusamus deserunt perspiciatis
            aperiam voluptatem assumenda distinctio.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

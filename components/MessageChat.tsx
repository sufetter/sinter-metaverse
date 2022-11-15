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

  return (
    <Flex alignSelf={position} direction="row">
      <Flex direction="column">
        <Avatar src="" mr="15px" />
      </Flex>
      <Flex direction="column">
        <Flex direction="column">
          <Flex>
            <Text color="gray" mr="10px" fontWeight={500}>
              User Name
            </Text>
            <Text color="gray.600" fontWeight={500}>
              {date.getHours() + ":" + date.getMinutes()}
            </Text>
          </Flex>

          <Text
            color="white"
            w="fit-content"
            px={3}
            py={0.5}
            borderRadius="5px"
            marginBottom={4}
            textAlign="justify"
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

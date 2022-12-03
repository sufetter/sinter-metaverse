import React from "react";
import {
  Flex,
  Avatar,
  Heading,
  Spacer,
  Icon,
  HStack,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";

const EmojiCard = ({smileIsOpen, setMessage, message}: any) => {
  let symbols: string[] = [];
  let i: number = 0;
  while (i < 80) {
    symbols[i] = String.fromCodePoint(128512 + i);
    i++;
  }
  return (
    <Flex direction="column" align="flex-end" w="100%">
      <Flex
        direction="row"
        color="white"
        w="200px"
        align-self="flex-end"
        bg={mainStyles.emojiDashboardColor}
        borderRadius="15px"
        h="250px"
        wrap="wrap"
        overflowY="scroll"
        display={smileIsOpen ? "flex" : "none"}
        fontSize="20px"
        zIndex={10}
        mx={1}
        mt="-250px"
        sx={{scrollbarWidth: "none"}}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: "30px",
          },
        }}
        textAlign="justify"
        user-select="none"
      >
        {symbols.map((symbol) => (
          <Flex
            align="center"
            justify="center"
            key={symbol}
            onClick={() => setMessage(message + symbol)}
            m="10px 10px"
            w="30px"
            h="30px"
            _hover={{cursor: "pointer"}}
          >
            {symbol}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default EmojiCard;

import React from "react";
import {Box, Flex, Stack, Spacer, Text} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";

const Header = () => {
  return (
    <Flex
      bg={mainStyles.headerBG}
      color="white"
      align="center"
      h="60px"
      zIndex={10}
      w="100%"
      justify="center"
    >
      <Flex maxW="1280px" w="100%" align="center" mx="60px">
        <Box>
          <Text fontFamily="Roboto" fontSize="24px">
            Sinter
          </Text>
        </Box>
        <Spacer />
        <Box>Box 2</Box>
      </Flex>
    </Flex>
  );
};

export default Header;

import React from "react";
import {Box, Flex, Stack, Spacer, Text} from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      bg="#22242C"
      color="white"
      // position="absolute"
      align="center"
      mx="60px"
      h="60px"
      zIndex={10}
    >
      <Box>
        <Text fontFamily="Roboto" fontSize="24px">
          Sinter
        </Text>
      </Box>
      <Spacer />
      <Box>Box 2</Box>
    </Flex>
  );
};

export default Header;

import React from "react";
import {
  Box,
  Flex,
  Stack,
  Spacer,
  Text,
  Avatar,
  ChakraProvider,
  Icon,
} from "@chakra-ui/react";
import {IoIosArrowDown} from "react-icons/io";
import {mainStyles} from "./LayoutCard";

const Header = () => {
  return (
    <ChakraProvider>
      <Flex
        bg={mainStyles.headerBG}
        color="white"
        align="center"
        h="60px"
        zIndex={10}
        w="100%"
        justify="center"
      >
        <Flex maxW="1076px" w="100%" align="center" mx="60px">
          <Box _hover={{cursor: "pointer"}}>
            <Text fontFamily="Roboto" fontSize="24px">
              Sinter
            </Text>
          </Box>
          <Spacer />
          <Flex align="center" _hover={{cursor: "pointer"}}>
            <Avatar src=""></Avatar>
            <Icon as={IoIosArrowDown} ml={1} boxSize="20px" />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Header;

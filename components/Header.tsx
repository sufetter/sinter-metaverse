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
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {BiSearchAlt2} from "react-icons/bi";
import {IoIosArrowDown} from "react-icons/io";
import {mainStyles} from "./LayoutCard";

export const HeaderSearch = () => {
  return (
    <Flex px={3} h="55px" align="center">
      <InputGroup size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearchAlt2 color="white" size="18px" />}
        />
        <Input
          type="tel"
          color="white"
          placeholder="Search"
          borderRadius="5px"
          borderColor={mainStyles.headerBG}
          bg={mainStyles.headerSearchBGColor}
          css={{
            "::placeholder": {
              color: mainStyles.headerBG,
              opacity: 1,
            },
          }}
        />
      </InputGroup>
    </Flex>
  );
};

const Header = () => {
  return (
    <ChakraProvider>
      <Flex
        bg={mainStyles.headerBG}
        color="white"
        align="center"
        h="50px"
        zIndex={10}
        w="100%"
        justify="center"
      >
        <Flex maxW="1076px" w="100%" align="center" mx="60px">
          <Flex _hover={{cursor: "pointer"}} w="148px">
            <Text fontFamily="Roboto" fontSize="24px">
              Sinter
            </Text>
          </Flex>
          <Flex>
            <HeaderSearch />
          </Flex>
          <Spacer />
          <Flex align="center" _hover={{cursor: "pointer"}}>
            <Avatar src="" boxSize="35px"></Avatar>
            <Icon as={IoIosArrowDown} ml={1} boxSize="17px" />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Header;

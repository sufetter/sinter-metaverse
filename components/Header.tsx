import React, {useState, useContext, useEffect} from "react";
import {
  Box,
  Flex,
  HStack,
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
import Link from "next/link";
import {AuthContext} from "../context/AuthContext";
import {auth} from "../firebaseconfig";

export const HeaderSearch = () => {
  return (
    <Flex pr={3} h="55px" align="center">
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
          focusBorderColor={mainStyles.headerBG}
          _hover={{borderColor: mainStyles.headerBG}}
          bg={mainStyles.headerSearchBGColor}
          css={{
            "::placeholder": {
              color: mainStyles.secondTextColor,
              opacity: 1,
            },
          }}
        />
      </InputGroup>
    </Flex>
  );
};

const Header = () => {
  const [userAvatarSRC, setUserAvatarSRC] = useState("");
  const currentUser: any = useContext(AuthContext);
  // useEffect(() => {
  //   console.log(currentUser);
  //   if (Object.keys(currentUser).length !== 0) {
  //     if (
  //       userAvatarSRC != currentUser.photoURL &&
  //       currentUser.photoURL !== undefined
  //     ) {
  //       console.log(userAvatarSRC);
  //       console.log(currentUser.photoURL);
  //       setUserAvatarSRC(currentUser.photoURL);
  //     }
  //   }
  // }, [currentUser]);

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
            <HStack align="center">
              <Link href="/chat/fisting">
                <a>CHAT</a>
              </Link>
              <Link href="/register">
                <a>REG</a>
              </Link>
            </HStack>
          </Flex>
          <Spacer />
          <Flex align="center" _hover={{cursor: "pointer"}}>
            <Text color="white" pr={5}>
              {currentUser.displayName}
            </Text>
            <Avatar src={currentUser.photoURL} boxSize="35px"></Avatar>
            <Icon as={IoIosArrowDown} ml={1} boxSize="17px" />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Header;

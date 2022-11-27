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
  Image,
} from "@chakra-ui/react";
import {BiSearchAlt2} from "react-icons/bi";
import {IoIosArrowDown} from "react-icons/io";
import {mainStyles} from "./LayoutCard";
import Link from "next/link";
import {AuthContext} from "../context/AuthContext";
import {auth} from "../firebaseconfig";
import userIcon from "../images/user.png";

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
  const [userAvatarSRC, setUserAvatarSRC] = useState(userIcon.src);
  const currentUser: any = useContext(AuthContext);
  if (
    Object.keys(currentUser).length !== 0 &&
    userAvatarSRC != currentUser.photoURL &&
    userAvatarSRC != undefined &&
    currentUser.photoURL != undefined &&
    userAvatarSRC == ""
  ) {
    console.log("fff");
    setUserAvatarSRC(currentUser.photoURL);
  }
  useEffect(() => {
    if (
      Object.keys(currentUser).length == 0 ||
      typeof currentUser == "string"
    ) {
      setUserAvatarSRC(userIcon.src);
    } else if (currentUser.photoURL != undefined) {
      setUserAvatarSRC(currentUser.photoURL);
    }
  }, [currentUser]);

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
        // onClick={() => console.log(userAvatarSRC)}
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
            <Image src={userAvatarSRC} h="35px" borderRadius="20px"></Image>
            <Icon as={IoIosArrowDown} ml={1} boxSize="17px" />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Header;

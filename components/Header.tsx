import React, {useState, useContext, useEffect, useRef} from "react";
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
import mainLOGO from "../images/mainLOGO.png";
import {motion} from "framer-motion";

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
  const currentUser: any = useContext(AuthContext);
  // const userAvatar: any = useRef(null);
  // let currentSRC: any;
  // if (
  //   ((currentUser == undefined ||
  //     currentUser == null ||
  //     currentUser.photoURL == "" ||
  //     typeof currentUser == "string") &&
  //     userAvatar.current?.src != null) ||
  //   userAvatar.current?.src != userIcon.src
  // ) {
  //   console.log("icon");
  //   // console.log(userAvatar?.current.src);
  //   currentSRC = userIcon.src;
  // } else if (
  //   currentUser !== undefined &&
  //   currentUser !== null &&
  //   currentUser.photoURL !== "" &&
  //   typeof currentUser !== "string" &&
  //   Object.keys(currentUser).length !== 0
  // ) {
  //   console.log("photo");
  //   currentSRC = currentUser.photoURL;
  // }
  // const [userAvatarSRC, setUserAvatarSRC] = useState(currentSRC);
  // useEffect(() => {
  //   if (
  //     currentUser !== undefined &&
  //     currentUser !== null &&
  //     currentUser.photoURL !== "" &&
  //     typeof currentUser !== "string" &&
  //     Object.keys(currentUser).length !== 0
  //   ) {
  //     setUserAvatarSRC(currentUser.photoURL);
  //   } else if (
  //     (currentUser == undefined ||
  //       currentUser == null ||
  //       currentUser.photoURL == "" ||
  //       typeof currentUser == "string") &&
  //     userAvatarSRC != userIcon.src
  //   ) {
  //     console.log("wtf");
  //     console.log(userAvatarSRC);
  //     setUserAvatarSRC(userIcon.src);
  //   }
  // }, [currentUser]);

  const [userAvatarSRC, setUserAvatarSRC] = useState(currentUser.photoURL);

  if (
    Object.keys(currentUser).length !== 0 &&
    userAvatarSRC != currentUser.photoURL &&
    userAvatarSRC != undefined &&
    currentUser.photoURL != undefined &&
    userAvatarSRC == ""
  ) {
    console.log("a");
    setUserAvatarSRC(currentUser.photoURL);
  }
  useEffect(() => {
    if (
      currentUser.photoURL != undefined &&
      userAvatarSRC != currentUser.photoURL
    ) {
      console.log("agg");
      setUserAvatarSRC(currentUser.photoURL);
    } else if (
      // Object.keys(currentUser).length == 0 ||
      typeof currentUser == "string"
    ) {
      console.log("wtf");
      setUserAvatarSRC(userIcon.src);
    } else if (userAvatarSRC == currentUser.photoURL) {
      return;
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
          <Flex _hover={{cursor: "pointer"}} w="148px" align="center">
            <motion.div
              whileHover={{scale: 0.8, rotate: 90}}
              transition={{
                duration: 0.7,
              }}
            >
              <Image src={mainLOGO.src} h="35px" />
            </motion.div>

            <Text fontFamily="Roboto" fontSize="20px" pl={2}>
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
            <Image
              // ref={userAvatar}
              src={userAvatarSRC}
              h="35px"
              borderRadius="20px"
            />
            <Icon as={IoIosArrowDown} ml={1} boxSize="17px" />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Header;

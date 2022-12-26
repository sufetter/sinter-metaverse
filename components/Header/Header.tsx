import React, {useState, useEffect, useRef, memo, useContext} from "react";
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
  Button,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import {BiSearchAlt2} from "react-icons/bi";
import {IoIosArrowDown} from "react-icons/io";
import {mainStyles} from "../Layout/LayoutCard";
import Link from "next/link";
// import {useAppSelector} from "../../src/hooks/redux";
import {AuthContext} from "../../context/AuthContext";
import {auth, db} from "../../firebaseconfig";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import {motion} from "framer-motion";

export const HeaderSearch = () => {
  return (
    <Flex ml={{base: 3, md: "44px"}} pr={3} h="55px" align="center">
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

const Logo = memo(() => {
  const [logoSRC, setLogoSRC] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/mainLOGO.png?alt=media&token=7a5344ac-0842-4ee6-b542-b1bddbbe8bb1"
  );

  return (
    <motion.div
      whileHover={{scale: 0.8, rotate: 90}}
      transition={{
        duration: 0.7,
      }}
    >
      <Image src={logoSRC} h="35px" />
    </motion.div>
  );
});

export const Header = memo(() => {
  // TO DO Change on Redux
  const currentUser: any = useContext(AuthContext);

  useEffect(() => {
    if (currentUser.displayName != null) {
      console.log("updating");
      updateDoc(doc(db, "users", currentUser.uid), {
        lastTimeSignIn: Timestamp.now(),
      });
    }
  }, [currentUser]);

  let dbUser: any;

  const userIcon =
    "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099";
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef: any = doc(db, "users", user.uid);
        const existed: any = await getDoc(docRef);

        if (existed.exists() && user.displayName != null) {
          if (username != user.displayName) {
            dbUser = await existed.data();
            if (dbUser.photoURL == undefined) {
              setUserAvatarSRC(userIcon);
            } else {
              setUserAvatarSRC(dbUser.photoURL);
            }
            setUsername(dbUser.displayName);
          }
        }
      } else {
        setUsername("");
        if (userAvatarSRC != userIcon) {
          setUserAvatarSRC(userIcon);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }

  const [userAvatarSRC, setUserAvatarSRC] = useState(
    () => currentUser.photoURL || userIcon
  );
  const [username, setUsername] = useState<any>(currentUser.displayName);
  let chatHref =
    "/chat/" + currentUser.displayName + "." + currentUser.uid?.slice(0, 5);
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
        <Flex maxW="1076px" w="100%" align="center" mx={{base: 3, lg: "60px"}}>
          <Flex
            _hover={{cursor: "pointer"}}
            // w={{sm: "auto", lg: "148px"}}
            align="center"
          >
            <Logo />
            <Text
              fontFamily="Roboto"
              fontSize="20px"
              pl={2}
              display={{base: "none", md: "block"}}
            >
              Sinter
            </Text>
          </Flex>
          <Flex shrink={2}>
            <HeaderSearch />
            <HStack align="center">
              <Link href={chatHref}>
                <a>CHAT</a>
              </Link>
              <Link href="/register">
                <a>REG</a>
              </Link>
            </HStack>
          </Flex>
          <Spacer />
          <Flex align="center" _hover={{cursor: "pointer"}}>
            <Text color="white" display={{base: "none", md: "block"}} pr={5}>
              {username}
            </Text>
            <Image
              // ref={userAvatar}
              src={userAvatarSRC}
              h="35px"
              w="35px"
              borderRadius="20px"
            />
            <Flex>
              <Icon
                as={IoIosArrowDown}
                color={mainStyles.mainIconColor}
                ml={0.5}
                boxSize="17px"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
});

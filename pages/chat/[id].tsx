import {Avatar, Box, ChakraProvider, Flex, Icon, Text} from "@chakra-ui/react";
import React, {useState, useRef, useContext, useEffect} from "react";

import {MainChat} from "../../components/MainChat";
import {Sidebar} from "../../components/Sidebar";
import {ChatSettings} from "../../components/ChatSettings";
import {ChatList} from "../../components/ChatList";
import {mainStyles, LayoutCard, navigate} from "../../components/Layout";
import {HiOutlineChatAlt2} from "react-icons/hi";
import {TbLock} from "react-icons/tb";
import {AuthContext} from "../../context/AuthContext";
import {useRouter} from "next/router";

const id: React.FC = () => {
  const currentUser: any = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    const trueRoute =
      currentUser?.displayName + "." + currentUser?.uid?.slice(0, 5);

    if (typeof currentUser !== "object") {
      console.log("blocked");
      console.log(currentUser);
      setChatCard(<></>);
      setChatList(false);
      // setTimeout(() => navigate("/register"), 5000);
    }

    if (
      typeof currentUser == "object" &&
      router.asPath.split("/chat/")[1] !== trueRoute &&
      Object.keys(currentUser).length > 1
    ) {
      navigate(
        "/chat/" + currentUser.displayName + "." + currentUser.uid?.slice(0, 5)
      );
    }
  }, [currentUser]);
  const searchInput = useRef<any>(null);
  const ChatCardDefault = () => {
    const focusSearchInput = () => {
      searchInput.current?.focus();
    };
    return (
      <Flex
        display={{sm: "none", md: "flex"}}
        flex={2}
        h="100%"
        align="center"
        justify="center"
        w="100%"
        direction="column"
      >
        <Icon as={HiOutlineChatAlt2} color="white" boxSize="70px" />
        <Text color="white" as="span">
          Select any chat
        </Text>
        <Text>
          <Text color="white" as="span">
            or{" "}
          </Text>
          <Text
            color={mainStyles.mainItemColor}
            as="span"
            _hover={{textDecoration: "underline", cursor: "pointer"}}
            onClick={focusSearchInput}
          >
            create new one
          </Text>
        </Text>
      </Flex>
    );
  };
  const [chatCard, setChatCard] = useState(ChatCardDefault);
  const [chatList, setChatList] = useState(true);
  return (
    <LayoutCard style={{height: "100vh", overflow: "hidden"}}>
      <ChakraProvider>
        <Flex
          bg={mainStyles.mainBGColor}
          overflowY="hidden"
          my={{base: 0, lg: 3}}
          mx={{base: 0, lg: 3}}
          h="100%"
        >
          <Sidebar />
          <Flex
            bg={mainStyles.chatCardBG}
            w="100%"
            borderRadius={{base: 0, sm: "10px 0 0 10px", lg: 10}}
            border="1px solid"
            overflow="hidden"
            borderColor={mainStyles.chatListBorderColor}
          >
            <Flex
              display={chatList ? "none" : "flex"}
              align="center"
              justify="center"
              w="100%"
            >
              <Flex direction="column">
                <Flex w="100%" justify="center">
                  <Icon
                    as={TbLock}
                    color={mainStyles.mainItemColor}
                    boxSize="70px"
                  />
                </Flex>

                <Text color="white" maxWidth="300px" textAlign="justify">
                  You are not authorized, access is denied. Please{" "}
                  <Text
                    color={mainStyles.mainItemColor}
                    as="span"
                    _hover={{textDecoration: "underline", cursor: "pointer"}}
                    onClick={() => navigate("/login")}
                  >
                    sing in
                  </Text>{" "}
                  or{" "}
                  <Text
                    color={mainStyles.mainItemColor}
                    as="span"
                    _hover={{textDecoration: "underline", cursor: "pointer"}}
                    onClick={() => navigate("/register")}
                  >
                    register
                  </Text>
                  . You will be automatically redirected to the registration
                  page in 5 seconds.
                </Text>
              </Flex>
            </Flex>
            {chatList && (
              <ChatList searchInput={searchInput} setChatCard={setChatCard} />
            )}
            {chatCard}
          </Flex>
        </Flex>
      </ChakraProvider>
    </LayoutCard>
  );
};

export default id;

import {Box, Flex, Stack, Spacer, Text, VStack} from "@chakra-ui/react";
import Head from "next/head";
import {Html} from "next/document";
import Header from "./Header";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/router";
import {userAuthSlice} from "../src/reducers/userAuthSlice";
import {useAppDispatch} from "../src/hooks/redux";
import {auth} from "../firebaseconfig";
import {onAuthStateChanged} from "firebase/auth";

type LayoutProps = {
  children: JSX.Element;
  card?: boolean;
  style?: object;
};

let secondBGColor = "#9D0039";
export const mainStyles = {
  mainItemColor: "#21C25E",
  mainBGColor: "#141414",
  mainTextColor: "#fff",
  mainIconColor: "#999a9c",
  secondTextColor: "#A4A6A8",
  messageTextColor: "#9BB0DE",
  chatHeaderTextColor: "#BBC7E4",
  sidebarBTNS: "",
  sidebarBTNSHover: "#494949",
  sidebarBTNSBBorder: secondBGColor,
  getMessages: "#224957",
  sendMessages: "#C1402F",
  cardBorder: "#224957",
  headerBG: "#222222",
  headerSearchBGColor: "#3F3F3F",
  chatCardBG: "#222222",
  chatCardSecondBGColor: "#292929",
  chatListItemHover: "#494949",
  chatListBorderColor: "#494949",
  chatInputBorderColor: "#494949",
  reservTextColor: "#534E93",
  singupGoogleBG: "#fff",
  singupGoogleBorderColor: "#fff",
  emojiDashboardColor: "#292929",
};

export let navigate: any;
export default function LayoutCard({
  children,
  card = false,
  style,
}: LayoutProps) {
  const router = useRouter();
  navigate = (href: string) => {
    router.push(`${href}`);
  };

  const {setCurrentUser} = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      dispatch(setCurrentUser(user));
    } else {
      dispatch(setCurrentUser("not user"));
    }
  });
  return (
    <>
      <Head>
        {/* <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic"
          rel="stylesheet"
        /> */}
      </Head>

      <Flex
        bg={mainStyles.mainBGColor}
        direction="column"
        height="100vh"
        {...style}
      >
        <VStack overflowY="hidden" height="100vh" w="100%">
          <Header />
          {card && (
            <motion.div
              style={{
                height: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
              }}
              initial={{x: -100, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: 0.3}}
            >
              <Flex
                direction="column"
                w="100%"
                h="100%"
                maxW="1076px"
                overflowY="hidden"
                height="100%"
                flex={1}
                id="1"
              >
                {children}
              </Flex>
            </motion.div>
          )}
          {!card && (
            <Flex
              direction="column"
              w="100%"
              h="100%"
              maxW="1076px"
              overflowY="hidden"
              mx="60px"
              height="100%"
              flex={1}
              id="1"
            >
              {children}
            </Flex>
          )}
          {/* <Footer /> */}
        </VStack>
      </Flex>
    </>
  );
}

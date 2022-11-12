import {Box, Flex, Stack, Spacer, Text} from "@chakra-ui/react";
import Head from "next/head";
import Header from "./Header";

type LayoutProps = {
  children: JSX.Element;
  main?: boolean;
  style?: object;
};

export const mainStyles = {
  mainItemColor: "#FF9A02",
  mainBGColor: "#22242C",
  sidebarBTNS: "",
  sidebarBTNSHover: "#224957",
  sidebarBTNSBBorder: "#224957",
  getMessages: "#224957",
  sendMessages: "#C1402F",
};

<link
  href="https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic"
  rel="stylesheet"
/>;

export default function LayoutCard({
  children,
  main = true,
  style,
}: LayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic"
          rel="stylesheet"
        />
      </Head>

      <Flex bg={mainStyles.mainBGColor} justify="center">
        <Flex
          direction="column"
          bg={mainStyles.mainBGColor}
          w="100%"
          maxW="1280px"
          minH="100vh"
          {...style}
        >
          <Header />
          {/* {main && <Header />} */}
          {children}

          {/* <Flex bg="#030812" color="white">
            fdjfdj
          </Flex> */}
        </Flex>
      </Flex>
      {/* <Footer /> */}
    </>
  );
}

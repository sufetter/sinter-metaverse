import {Box, Flex, Stack, Spacer, Text} from "@chakra-ui/react";
import Head from "next/head";

type LayoutProps = {
  children: JSX.Element;
};

<link
  href="https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic"
  rel="stylesheet"
/>;

export default function LayoutCard({children}: LayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic"
          rel="stylesheet"
        />
      </Head>

      <Flex bg="#030812" justify="center">
        <Flex
          direction="column"
          bg="#030812"
          w="100%"
          maxW="1280px"
          minH="100vh"
        >
          <Flex
            bg="#030812"
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

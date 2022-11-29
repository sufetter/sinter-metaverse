import type {NextPage} from "next";
import Head from "next/head";
import Login from "./login";
import {ChakraProvider, Divider, Flex} from "@chakra-ui/react";
import Register from "./register";
import Test from "../components/test";

import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Flex flex={1} align="center" justify="center" w="!00%" h="100%">
          <Divider colorScheme={"red"} />
          ff
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default Home;

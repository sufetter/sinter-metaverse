import {Box, Flex, Stack, Spacer} from "@chakra-ui/react";

type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({children}: LayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      <Flex minHeight="100vh" bg="#030812" justify="center" align="center">
        <Flex
          direction="column"
          justify="space-between"
          bg="#030812"
          w="100%"
          maxW="1280px"
        >
          <Flex bg="#030812" color="white">
            fdjfdj
          </Flex>

          {children}

          <Flex bg="#030812" color="white">
            fdjfdj
          </Flex>
        </Flex>
      </Flex>
      {/* <Footer /> */}
    </>
  );
}

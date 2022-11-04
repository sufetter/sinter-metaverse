import {Box, Flex, Stack, Spacer} from "@chakra-ui/react";

type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({children}: LayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      <Flex
        direction="column"
        minHeight="100vh"
        maxHeight="100vh"
        justify="space-between"
        bg="#030812"
      >
        <Flex bg="#030812" color="white">
          fdjfdj
        </Flex>

        {children}

        <Flex bg="#030812" color="white">
          fdjfdj
        </Flex>

        {/* <Footer /> */}
      </Flex>
    </>
  );
}

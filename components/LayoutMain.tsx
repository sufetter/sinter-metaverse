import {Box, Flex, Stack, Spacer} from "@chakra-ui/react";

type LayoutProps = {
  children: JSX.Element;
  height: string;
};

export default function LayoutMain({children, height}: LayoutProps) {
  return (
    <>
      {/* <Navbar /> */}

      <Flex bg="#030812" justify="center">
        <Flex
          direction="column"
          justify="space-between"
          bg="#030812"
          w="100%"
          maxW="1280px"
          minH="100vh"
          maxH={height}
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

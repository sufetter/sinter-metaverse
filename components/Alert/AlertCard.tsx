import React, {useEffect, useRef} from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {mainStyles} from "../Layout";

export const AlertCard = ({header, body, children, bottom}: any) => {
  let alertRef = useRef(null);
  // useEffect(() => {
  //   if (document)
  //     document.addEventListener("click", (e) => {
  //       if (e.target != alertRef.current) {
  //         console.log("work");
  //       }
  //     });
  // }, [document]);

  return (
    <Flex
      mb={bottom}
      position="relative"
      mt={5}
      ref={alertRef}
      bg={"#383D45"}
      w="300px"
      borderRadius="7px"
      border="1px solid"
      borderColor={"gray"}
    >
      <motion.div
        initial={{x: -70, opacity: 0, scale: 0.5}}
        animate={{x: 0, opacity: 1, scale: 1}}
        transition={{duration: 0.5, default: {ease: "easeInOut"}}}
        exit={{x: 70, opacity: 0, scale: 0.5}}
        key={Math.random()}
      >
        <Flex direction="column" w="100%" p={3}>
          <Flex w="100%" align="center">
            <Text
              color={mainStyles.mainItemColor}
              fontSize="18px"
              fontWeight="600"
            >
              {header}
            </Text>
          </Flex>
          <Flex align="center" justify="center" mb={3} mt={1}>
            <Text color={"white"} fontSize="16px">
              {body}
            </Text>
          </Flex>

          <Flex justifyContent="flex-end" w="100%">
            {children}
          </Flex>
        </Flex>
      </motion.div>
    </Flex>
  );
};

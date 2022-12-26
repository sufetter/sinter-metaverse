import React from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Flex} from "@chakra-ui/react";
import {mainStyles} from "../Layout";

export const ModalBlockCard = ({
  height = "auto",
  width = "auto",
  isOpen,
  children,
}: any) => {
  return (
    <Flex mt={2} alignSelf="end" zIndex={100}>
      <motion.div
        initial={{x: -70, opacity: 0, scale: 0.5}}
        animate={{x: 0, opacity: 1, scale: 1}}
        transition={{duration: 0.5, default: {ease: "easeInOut"}}}
        exit={{x: 70, opacity: 0, scale: 0.5}}
        key={Math.random()}
      >
        <Flex
          direction="column"
          h={height}
          w={width}
          bg={mainStyles.headerBG}
          border="2px solid"
          borderColor={mainStyles.chatListBorderColor}
          borderRadius="10px"
        >
          {children}
        </Flex>
      </motion.div>
    </Flex>
  );
};

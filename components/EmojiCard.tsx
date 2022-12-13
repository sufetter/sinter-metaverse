import React, {useMemo, useEffect, useState} from "react";
import {
  Flex,
  Avatar,
  Heading,
  Spacer,
  Icon,
  HStack,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";
import {motion} from "framer-motion";

const EmojiCard = ({smileIsOpen, setMessage, message}: any) => {
  const [browserStyles, setBrowserStyles] = useState({});
  let userAgent;
  let browserName;
  useEffect(() => {
    userAgent = navigator.userAgent;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
      setBrowserStyles({
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "::-webkit-scrollbar-thumb": {
          background: mainStyles.mainIconColor,
          borderRadius: "10px",
        },
      });
    } else {
      setBrowserStyles({scrollbarWidth: "none", width: "200px"});
    }
  }, [browserName]);

  browserName == "chrome"
    ? {
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "::-webkit-scrollbar-thumb": {
          background: mainStyles.mainIconColor,
          borderRadius: "10px",
        },
      }
    : {scrollbarWidth: "none", width: "200px"};

  let symbols: string[] = [];
  const fillSymbols = useMemo(() => {
    let i: number;
    for (i = 0; i < 80; i++) {
      symbols[i] = String.fromCodePoint(128512 + i);
    }
    for (i = 128; i < 164; i++) {
      symbols[i] = String.fromCodePoint(128512 + i);
    }
  }, [symbols]);

  const variants = {
    open: {opacity: 1, x: 0},
    closed: {opacity: 0, x: 0},
  };

  return (
    <motion.div
      animate={smileIsOpen ? "open" : "closed"}
      variants={variants}
      transition={{duration: 0.3}}
    >
      <Flex direction="column" align="flex-end" w="100%">
        <Flex
          direction="row"
          color="white"
          w="210px"
          align-self="flex-end"
          bg={mainStyles.emojiDashboardColor}
          borderRadius="7px"
          h="250px"
          wrap="wrap"
          overflowY="scroll"
          display={smileIsOpen ? "flex" : "none"}
          fontSize="20px"
          zIndex={10}
          mx={1}
          mt="-250px"
          css={browserStyles}
          textAlign="justify"
          user-select="none"
        >
          {symbols.map((symbol) => (
            <Flex
              align="center"
              justify="center"
              key={symbol}
              onClick={() => setMessage(message + symbol)}
              m="10px 10px"
              w="30px"
              h="30px"
              _hover={{cursor: "pointer"}}
            >
              {symbol}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default EmojiCard;

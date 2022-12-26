import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import React, {memo, useState, useRef, useEffect} from "react";
import {mainStyles} from "../Layout";
export interface StandardProps {
  type?: string;
  children?: React.ReactNode;
  message: any;
  time?: any;

  user?: any;
}
export const MessageChat = memo(
  ({children, type, message, time, user}: StandardProps) => {
    const lastRef: any = useRef();
    const [src, setSRC] = useState(
      "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099"
    );
    let fileSRC;

    if (src != user.photoURL && user.photoURL != "" && user.photoURL != null)
      setSRC(user.photoURL);

    if (message.includes("firebasestorage.googleapis.com")) {
      fileSRC = message;
      message = false;
    }

    useEffect(() => {
      lastRef.current?.scrollIntoView({behavior: "smooth"});
    }, [message]);

    let dateFormat = new Date(time.seconds * 1000);
    let min: any = dateFormat.getMinutes();
    if (dateFormat.getMinutes() < 10) {
      min = "0" + dateFormat.getMinutes().toLocaleString();
    }

    let localTime =
      dateFormat.getDate() +
      "." +
      (dateFormat.getMonth() + 1) +
      "." +
      dateFormat.getFullYear() +
      " " +
      dateFormat.getHours() +
      ":" +
      min;

    return (
      <Flex direction="row" my={1.5} ref={lastRef}>
        <Box
          flex={{base: "0 0 40px", sm: "0 0 45px"}}
          height={{base: "40px", sm: "45px"}}
          borderRadius={{base: "17.5px", sm: "20px"}}
          overflow="hidden"
          mr="10px"
        >
          <img style={{height: "100%"}} src={src} />
        </Box>

        <Flex direction="column">
          <Flex direction="column">
            <Flex align="center">
              <Text
                color={mainStyles.messageTextColor}
                mr="10px"
                fontWeight={500}
                fontSize={{base: 12, sm: 14}}
              >
                {user?.displayName}
              </Text>
              <Text
                color={mainStyles.secondTextColor}
                fontWeight={400}
                fontSize={{base: 10, sm: 14}}
              >
                {localTime}
              </Text>
            </Flex>
            {message && (
              <Text
                flex={0}
                color="white"
                w="fit-content"
                wordBreak="break-all"
                py={0.5}
                borderRadius="5px"
                textAlign="justify"
                fontSize="14px"
              >
                {message}
              </Text>
            )}
            {fileSRC && (
              <img
                src={fileSRC}
                style={{maxHeight: "250px", marginTop: "10px"}}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

import {Avatar, Flex, Text} from "@chakra-ui/react";
import React from "react";
import {mainStyles} from "./LayoutCard";
import {db} from "../firebaseconfig";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export interface StandardProps {
  type?: string;
  children?: React.ReactNode;
  message: string;
  time: string;
  uid: string;
}
export const MessageChat = ({
  children,
  type,
  message,
  time,
  uid,
}: StandardProps) => {
  let position;
  let user: any = async () => {
    let docs = await getDoc(doc(db, "users", uid));
    console.log(docs.data());
    return docs.data();
  };

  return (
    <Flex alignSelf={position} direction="row" my={1.5}>
      <Flex direction="column">
        <Avatar src="" mr="10px" boxSize="40px" />
      </Flex>
      <Flex direction="column">
        <Flex direction="column">
          <Flex align="center">
            <Text
              color={mainStyles.messageTextColor}
              mr="10px"
              fontWeight={500}
              fontSize="14px"
            >
              {user?.displayName}
            </Text>
            <Text
              color={mainStyles.secondTextColor}
              fontWeight={400}
              fontSize="14px"
            >
              {time}
            </Text>
          </Flex>

          <Text
            color="white"
            w="fit-content"
            py={0.5}
            borderRadius="5px"
            textAlign="justify"
            fontSize="14px"
          >
            {message}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

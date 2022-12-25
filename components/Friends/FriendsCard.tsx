import {Flex} from "@chakra-ui/react";
import {doc, getDoc} from "firebase/firestore";
import React from "react";
import {db} from "./../../firebaseconfig";
import {useAppDispatch, useAppSelector} from "../../src/hooks/redux";

export const FriendsCard = () => {
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  const getFriends = async () => {
    const query = await getDoc(doc(db, "userfriends", currentUser.uid));
    return query.data();
    console.log(query.data());
  };

  return <Flex h="100%" w="100%" flex={1}></Flex>;
};

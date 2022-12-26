import {Flex} from "@chakra-ui/react";

import React, {useEffect, useState} from "react";
import {db} from "./../../firebaseconfig";
import {useAppDispatch, useAppSelector} from "../../src/hooks/redux";
import {ModalBlockCard} from "../ModalBlock";
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
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import {ChatItem} from "../ChatList";

export const FriendsCard = () => {
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  const [friends, setFriends] = useState<any>();

  useEffect(() => {
    if (currentUser != String) {
      const getFriends = async () => {
        const newChat = onSnapshot(
          doc(db, "userfriends", currentUser.uid),
          (doc) => {
            let resFriends: any = doc.data();
            if (resFriends) {
              let friendsArr = Object.entries(resFriends);
              console.log(friendsArr);
              // let res = friendsArr.map((userID: any) => {
              //  const userInfo: any = await getDoc(doc(db, "users", friendsArr[0]));
              //   // <Flex>jhkh</Flex>;
              // });
              // setFriends(res);
            } else {
              setFriends(<></>);
            }
          }
        );

        return () => {
          getFriends();
        };
      };

      currentUser.uid && getFriends();
    }
  }, [currentUser]);

  return (
    <Flex h="100%" w="100%" flex={1}>
      {friends}
    </Flex>
  );
};

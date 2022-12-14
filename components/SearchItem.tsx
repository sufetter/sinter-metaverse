import {
  Flex,
  Text,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Stack,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import React, {useState, useContext, useEffect, memo, useMemo} from "react";
import {BiSearchAlt2} from "react-icons/bi";
import {CiSettings} from "react-icons/ci";
import {MdAdd} from "react-icons/md";
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
  orderBy,
} from "firebase/firestore";
import {MainChat} from "./MainChat";
import {useAppSelector} from "../src/hooks/redux";

type SearchItemProps = {
  searchedAvatar?: string;
  searchedName?: string;
  searchedUser?: any;
  options?: boolean;
};

export const SearchItem = memo(({searchedUser}: SearchItemProps) => {
  const [user, setUser] = useState(searchedUser);
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  let searchedAvatar: string =
    "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099";
  if (user?.photoURL != undefined && user?.photoURL != "") {
    searchedAvatar = user.photoURL;
  }

  const setToChatList = async () => {
    try {
      const combinedUid: any =
        currentUser.uid.slice(0, 5) + "" + user?.userID?.slice(0, 5);
      const combinedUidReverse =
        user?.userID?.slice(0, 5) + currentUser?.uid?.slice(0, 5) + "";
      const docRef: any = doc(db, "chats", combinedUid);
      const existed: any = await getDoc(docRef);

      const check = (user: any) => {
        if (user?.photoURL != undefined) {
          return user.photoURL;
        } else return "";
      };

      if (!existed.exists()) {
        console.log("added");
        console.log(combinedUid);
        console.log(user.userID);
        console.log(currentUser.uid);
        await setDoc(doc(db, "chats", combinedUid), {messages: []});
        await setDoc(doc(db, "chats", combinedUidReverse), {messages: []});
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedUid + ".userInfo"]: {
            uid: user.userID,
            displayName: user.displayName,
            photoURL: check(user),
          },
          [combinedUid + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.userID), {
          [combinedUidReverse + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: check(currentUser),
          },
          [combinedUidReverse + ".date"]: serverTimestamp(),
        });
      } else {
        console.log("exists");
        console.log(existed.data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      p="2"
      _hover={{bg: mainStyles.chatListItemHover, cursor: "pointer"}}
      w="100%"
      px={4}
      py={2}
    >
      <Flex align="center" w="100%">
        <Box mr="10px" boxSize="45px">
          <img src={searchedAvatar} style={{borderRadius: "100px"}} />
        </Box>
        <Text ms={3} color="white">
          {searchedUser?.displayName}
        </Text>
      </Flex>
      <Flex align="center">
        <Tooltip label="Add user to chat list">
          <Flex align="center">
            <Icon
              as={MdAdd}
              color={mainStyles.mainIconColor}
              boxSize="25px"
              transition="color 200ms linear"
              onClick={setToChatList}
              _hover={{
                color: mainStyles.mainItemColor,
                cursor: "pointer",
              }}
            />
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
});

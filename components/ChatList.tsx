import {
  Flex,
  Text,
  Avatar,
  InputGroup,
  InputRightElement,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, {useState, useContext} from "react";
import {BiSearchAlt2} from "react-icons/bi";
import {mainStyles} from "./LayoutCard";
import {db} from "../firebaseconfig";
import {collection, query, where, getDocs} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";

type ChatItemProps = {
  searchedAvatar?: string;
  searchedName?: string;
};

export const ChatItem = ({
  searchedAvatar = "",
  searchedName = "User",
}: ChatItemProps) => {
  return (
    <Flex
      align="center"
      p="2"
      _hover={{bg: mainStyles.chatListItemHover, cursor: "pointer"}}
      w="100%"
      px={3}
      py={2}
    >
      <Avatar src={searchedAvatar} />
      <Text ms={3} color="white">
        {searchedName}
      </Text>
    </Flex>
  );
};

export const ChatSearch = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([{}]);
  const [error, setError] = useState<boolean>(false);
  const currentUser: any = useContext(AuthContext);

  // Почему дважды нужно вызвать?
  const handleSearch = async () => {
    const queryDB = query(
      collection(db, "users"),
      where("displayName", "==", username),
      where("userID", "!=", currentUser.uid)
    );
    try {
      const querySnapshot: any = await getDocs(queryDB);
      await querySnapshot.forEach((doc: any) => {
        setUsers(doc.data());
        console.log(doc.data());
        console.log(users);
      });
    } catch (err: any) {
      setError(true);
      console.log(err);
      console.log(err.message);
    }
  };

  const handleKey = async (e: any) => {
    e.code === "Enter" && handleSearch();
  };
  return (
    <Flex
      px={3}
      h="55px"
      align="center"
      borderBottom="3px solid"
      borderColor={mainStyles.chatInputBorderColor}
    >
      <InputGroup size="sm">
        <InputRightElement
          pointerEvents="none"
          children={<BiSearchAlt2 color="white" size="18px" />}
        />
        <Input
          type="tel"
          color="white"
          placeholder="Search"
          borderRadius="5px"
          onChange={(e: any) => {
            setUsername(e.target.value!);
            // handleSearch();
          }}
          onKeyDown={handleKey}
        />
      </InputGroup>
    </Flex>
  );
};

const ChatList = () => {
  return (
    <Flex
      flex={0.5}
      direction="column"
      borderEnd="3px solid"
      borderColor={mainStyles.chatListBorderColor}
    >
      <ChatSearch />
      <ChatItem searchedAvatar={""} />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </Flex>
  );
};
export default ChatList;

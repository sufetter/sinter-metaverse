import {
  Flex,
  Text,
  Avatar,
  InputGroup,
  InputRightElement,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, {useState, useContext, useEffect} from "react";
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

export const ChatSearch = ({
  handleSearchedUsers,
  username,
  setUsername,
}: any) => {
  const [error, setError] = useState<boolean>(false);
  const currentUser: any = useContext(AuthContext);

  useEffect(() => {
    if (username !== undefined && currentUser.uid !== undefined) handleSearch();
  }, [username]);

  const handleInput = (e: any) => {
    setUsername(e.target.value!);
  };
  const handleSearch = async () => {
    const queryDB = query(
      collection(db, "users"),
      where("displayName", "==", username),
      where("userID", "!=", currentUser.uid)
    );
    try {
      let results: Array<Object> = [];
      const querySnapshot: any = await getDocs(queryDB);
      await querySnapshot.forEach((doc: any) => {
        const result = doc.data();
        results.push(result);
      });

      handleSearchedUsers(results);
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
      minH="55px"
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
          onChange={handleInput}
          onKeyDown={handleKey}
        />
      </InputGroup>
    </Flex>
  );
};

const Render = ({searchedUsers, username}: any) => {
  let borderWidth = 0;
  let supMessage = "No user found";
  let type = 2;

  let result = searchedUsers?.map((user: any) => {
    return (
      <ChatItem
        searchedAvatar={user.photoURL}
        searchedName={user.displayName}
        key={Math.random()}
      />
    );
  });
  if (result?.length > 0) {
    borderWidth = 3;
    supMessage = "Users found:";
    type = 0;
  }
  if (supMessage != "") {
    borderWidth = 3;
  }
  if (username == "") {
    supMessage = "";
    borderWidth = 0;
  }

  return (
    <Flex
      direction="column"
      borderBottom={`${borderWidth}px solid`}
      borderColor={mainStyles.chatListBorderColor}
      sx={{scrollbarWidth: "none"}}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
          width: "30px",
        },
      }}
    >
      <Flex>
        <Text color="white" px={2} pt={2} pb={type}>
          {supMessage}
        </Text>
      </Flex>
      <Flex direction="column">{result}</Flex>
    </Flex>
  );
};

const ChatList = () => {
  const [searchedUsers, setSearchedUsers] = useState<any>();
  const [username, setUsername] = useState("");
  return (
    <Flex
      flex={0.5}
      direction="column"
      borderEnd="3px solid"
      borderColor={mainStyles.chatListBorderColor}
    >
      <ChatSearch
        handleSearchedUsers={(users: any) => setSearchedUsers(users)}
        username={username}
        setUsername={setUsername}
      />
      <Render searchedUsers={searchedUsers} username={username} />
      <Flex
        overflowY="scroll"
        direction="column"
        sx={{scrollbarWidth: "none"}}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: "30px",
          },
        }}
      >
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </Flex>
    </Flex>
  );
};
export default ChatList;

import {
  Flex,
  Text,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Stack,
} from "@chakra-ui/react";
import React, {useState, useContext, useEffect} from "react";
import {BiSearchAlt2} from "react-icons/bi";
import {CiSettings} from "react-icons/ci";
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
      px={4}
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
      // where("displayNameLC", "==", username.toLocaleLowerCase()),
      // where("userID", "!=", currentUser.uid)
      where("displayNameLC", ">=", username.toLocaleLowerCase())
      // where("displayNameLC", "<=", username.toLocaleLowerCase() + "~")
    );
    try {
      let results: Array<Object> = [];
      const querySnapshot: any = await getDocs(queryDB);
      await querySnapshot.forEach((doc: any) => {
        const result = doc.data();
        if (result.userID != currentUser.uid) results.push(result);
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
      px={1}
      minH="50px"
      align="center"
      borderBottom="2px solid"
      borderColor={mainStyles.chatInputBorderColor}
      bg={mainStyles.chatCardSecondBGColor}
      borderRadius="9px 0 0 0"
    >
      <InputGroup size="md">
        <Input
          borderColor={mainStyles.chatCardSecondBGColor}
          focusBorderColor={mainStyles.chatCardSecondBGColor}
          _hover={{borderColor: mainStyles.chatCardSecondBGColor}}
          placeholder="Search"
          color="white"
          onChange={handleInput}
          onKeyDown={handleKey}
        />
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearchAlt2 color="white" size="18px" />}
        />
      </InputGroup>
      <Flex pr={1.5}>
        <Icon
          as={CiSettings}
          color="white"
          boxSize={6}
          _hover={{cursor: "pointer"}}
        />
      </Flex>
    </Flex>
  );
};

const Render = ({searchedUsers, username}: any) => {
  let borderWidth = 0;
  let supMessage = "No user found";
  let type = 2;
  let display = "block";

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
    borderWidth = 1;
    supMessage = "Users found:";
    type = 0;
  }
  if (supMessage != "") {
    borderWidth = 1;
  }
  if (username == "") {
    supMessage = "";
    borderWidth = 0;
    display = "none";
  }

  return (
    <Flex
      direction="column"
      borderBottom={`${borderWidth}px solid`}
      borderColor={mainStyles.chatListBorderColor}
      display={display}
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
      borderEnd="1px solid"
      borderColor={mainStyles.chatListBorderColor}
    >
      <ChatSearch
        handleSearchedUsers={(users: any) => setSearchedUsers(users)}
        username={username}
        setUsername={setUsername}
      />
      <Render searchedUsers={searchedUsers} username={username} />
      <Flex
        pt={0}
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

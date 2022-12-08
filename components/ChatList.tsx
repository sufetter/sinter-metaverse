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
import React, {useState, useContext, useEffect, memo} from "react";
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
} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import {MainChat} from "./MainChat";

type ChatItemProps = {
  searchedAvatar?: string;
  searchedName?: string;
  searchedUser?: any;
  options?: boolean;
  setChatCard?: any;
};

export const ChatItem = memo(
  ({searchedUser, options, setChatCard}: ChatItemProps) => {
    const currentUser: any = useContext(AuthContext);
    let searchedAvatar: string = "";
    if (searchedUser?.photoURL != undefined) {
      searchedAvatar = searchedUser.photoURL;
    }

    const setToChatList = async () => {
      console.log("hh");
      try {
        const combinedUid: any =
          currentUser.uid.slice(0, 5) + "" + searchedUser?.userID!.slice(0, 5);
        console.log(combinedUid);
        const docRef: any = doc(db, "chats", combinedUid);
        const existed: any = await getDoc(docRef);
        let photoCheck = "";
        if (searchedUser?.photoURL != undefined) {
          photoCheck = searchedUser.photoURL;
        }

        if (!existed.exists()) {
          console.log("added");
          console.log(combinedUid);
          await setDoc(doc(db, "chats", combinedUid), {messages: []});
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedUid + ".userInfo"]: {
              uid: searchedUser.userID,
              displayName: searchedUser.displayName,
              photoURL: photoCheck,
            },
            [combinedUid + ".date"]: serverTimestamp(),
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
        <Flex
          align="center"
          w="100%"
          onClick={() => {
            setChatCard(<MainChat user={searchedUser} />);
          }}
        >
          <Avatar src={searchedAvatar} />
          <Text ms={3} color="white">
            {searchedUser?.displayName}
          </Text>
        </Flex>
        <Flex align="center">
          {options && (
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
          )}
        </Flex>
      </Flex>
    );
  }
);

export const ChatSearch = ({
  handleSearchedUsers,
  username,
  setUsername,
  searchInput,
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
      where("displayNameLC", "==", username.toLocaleLowerCase())
      // where("userID", "!=", currentUser.uid)
      // where("displayNameLC", ">=", username.toLocaleLowerCase())
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
          ref={searchInput}
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
        searchedUser={user}
        options
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

const ChatItemsList = memo(({setChatCard}: any) => {
  const currentUser: any = useContext(AuthContext);
  const [chats, setChats] = useState<any>([]);
  useEffect(() => {
    const getChats = () => {
      const newChat = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          console.log(Object.entries(chats));
          setChats(doc.data());
        }
      );

      return () => {
        newChat();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <Flex direction="column">
      {Object.entries(chats)?.map((chat: any) => {
        return (
          <ChatItem
            key={Math.random()}
            searchedUser={chat[1].userInfo}
            setChatCard={setChatCard}
          />
        );
      })}
    </Flex>
  );
});

type ChatListProps = {
  searchInput: any;
  setChatCard: any;
};

const ChatList = ({searchInput, setChatCard}: ChatListProps) => {
  const [searchedUsers, setSearchedUsers] = useState<any>();
  const [username, setUsername] = useState("");
  const [addedUsers, setAddedUsers] = useState([]);
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
        searchInput={searchInput}
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
        <ChatItemsList setChatCard={setChatCard} />
      </Flex>
    </Flex>
  );
};
export default ChatList;

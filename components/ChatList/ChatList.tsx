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
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import React, {useState, useEffect, memo, useMemo} from "react";
import {BiSearchAlt2} from "react-icons/bi";
import {CiSettings} from "react-icons/ci";
import {MdAdd} from "react-icons/md";
import {mainStyles} from "../Layout/LayoutCard";
import {db} from "../../firebaseconfig";
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
import {AuthContext} from "../../context/AuthContext";
import {MainChat} from "../MainChat";
import {mainSlice} from "../../src/reducers/MainSlice";
import {useAppDispatch, useAppSelector} from "../../src/hooks/redux";
import {SearchItem} from "../SearchItem";

type ChatItemProps = {
  searchedAvatar?: string;
  searchedName?: string;
  user?: any;
  options?: boolean;
  setChatCard?: any;
  lastMessage: any;
};
const ChatItem = memo(({user, setChatCard, lastMessage}: ChatItemProps) => {
  let searchedAvatar: string =
    "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099";
  if (user?.photoURL != undefined && user?.photoURL != "") {
    searchedAvatar = user.photoURL;
  }
  let date = new Date(lastMessage?.date?.seconds * 1000);
  let min: any = date.getMinutes();

  if (date.getMinutes() < 10) {
    min = "0" + date.getMinutes().toLocaleString();
  }
  let lastMessageDate = date.getHours() + ":" + min;
  let displayName = user?.displayName;

  if (user?.displayName.length > 9 || lastMessage?.message?.length > 9) {
    if (lastMessage?.message)
      lastMessage.message = lastMessage?.message.slice(0, 6) + "...";
    displayName = user?.displayName.slice(0, 6) + "...";
  }
  const {changeMainOpen, changeCurrentChat} = mainSlice.actions;
  const dispatch = useAppDispatch();
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
        onClick={async () => {
          dispatch(changeMainOpen("flex"));
          const userInfo: any = await getDoc(doc(db, "users", user.uid));
          dispatch(changeCurrentChat(userInfo.data()));
          setChatCard(<MainChat />);
        }}
      >
        <Box boxSize="45px" overflow="hidden" borderRadius="100px">
          <img width="100%" src={searchedAvatar} />
        </Box>
        <Flex direction="column">
          <Text ms={3} color="white">
            {displayName}
          </Text>
          <Flex>
            <Text wordBreak="break-all" ms={3} color="gray.400">
              {lastMessage?.message}
            </Text>
            {/* <Text ms={3} color={mainStyles.mainIconColor}>
                {lastMessageDate}
              </Text> */}
          </Flex>
        </Flex>
      </Flex>
      <Flex align="center"></Flex>
    </Flex>
  );
});

const ChatSearch = ({
  handleSearchedUsers,
  username,
  setUsername,
  searchInput,
}: any) => {
  const [error, setError] = useState<boolean>(false);
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);

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
        console.log(result);
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
      borderRadius={{base: 0, sm: "9px 0 0 0"}}
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
      <SearchItem
        searchedAvatar={user.photoURL}
        searchedName={user.displayName}
        searchedUser={user}
        options
        key={Math.random()}
      />
    );
  });
  // TO DO
  // make normal code here
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
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  const [chats, setChats] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getChats = () => {
      const newChat = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          let resChats: any = doc.data();
          if (resChats) {
            let chatsArr = Object.entries(resChats).sort();
            chatsArr.sort((a, b) => {
              if (a[1].userInfo < b[1].userInfo) {
                return -1;
              }
              if (a[1].userInfo < b[1].userInfo) {
                return 1;
              }

              // names must be equal
              return 0;
            });
            let res = chatsArr.map((chat: any) => {
              return (
                // <Flex
                //   align="center"
                //   px={loaded ? "0px" : "10px"}
                //   py={loaded ? "0px" : "10px"}
                // >
                //   <Skeleton key={Math.random()} isLoaded={false} w="100%">
                //     <ChatItem
                //       key={Math.random()}
                //       user={chat[1].userInfo}
                //       setChatCard={setChatCard}
                //       lastMessage={chat[1].lastMessage}
                //     />
                //   </Skeleton>
                // </Flex>
                <ChatItem
                  key={Math.random()}
                  user={chat[1].userInfo}
                  setChatCard={setChatCard}
                  lastMessage={chat[1].lastMessage}
                />
              );
            });

            setChats(res);
            setLoaded(!loaded);
          }
        }
      );

      return () => {
        newChat();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <Flex
      direction="column"
      h="100%"
      onClick={() => {
        setLoaded(!loaded);
      }}
    >
      <Flex direction="column">{chats}</Flex>
    </Flex>
  );
});

type ChatListProps = {
  searchInput: any;
  setChatCard: any;
};

export const ChatList = ({searchInput, setChatCard}: ChatListProps) => {
  const [searchedUsers, setSearchedUsers] = useState<any>();
  const [username, setUsername] = useState("");

  const {isOpen} = useAppSelector((state) => state.mainSlice);
  return (
    <Flex
      display={{base: isOpen === "none" ? "flex" : "none", md: "flex"}}
      flex={1}
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

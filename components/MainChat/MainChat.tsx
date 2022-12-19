import {
  Flex,
  Avatar,
  Heading,
  Spacer,
  Icon,
  HStack,
  Text,
  SlideFade,
  Image,
} from "@chakra-ui/react";
import React, {useState, memo, useContext, useEffect, useRef} from "react";
import {InputChat} from "../../components/InputChat";
import {MessageChat} from "../MessageChat";
import {mainStyles} from "../Layout";
import {FiMoreHorizontal} from "react-icons/fi";
import {BiSearchAlt2} from "react-icons/bi";
import {HiArrowLeft} from "react-icons/hi";
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
} from "firebase/firestore";
import {AuthContext} from "../../context/AuthContext";
import {EmojiCard} from "../../components/EmojiCard";
import {mainSlice} from "../../src/reducers/MainSlice";
import {useAppDispatch, useAppSelector} from "../../src/hooks/redux";

export const TopBarChat = memo(({displayName, avatarSRC}: any) => {
  const {changeMainOpen} = mainSlice.actions; //Ууууу Reduux
  const {currentChat} = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();
  if (avatarSRC == "" || avatarSRC == undefined) {
    avatarSRC =
      "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099";
  }
  let date = new Date(currentChat.lastTimeSignIn * 1000);

  let displayTime: string =
    (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
    ":" +
    (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());

  if ((date + "").includes("Invalid")) {
    displayTime = "time not found";
  }

  return (
    <Flex
      w="100%"
      align="center"
      justify="space-between"
      p={2}
      px={4}
      h="50px"
      borderBottom="2px solid"
      borderColor={mainStyles.chatInputBorderColor}
      bg={mainStyles.chatCardSecondBGColor}
    >
      <Icon
        as={HiArrowLeft}
        color="white"
        display={{base: "block", md: "none"}}
        boxSize="20px"
        _hover={{cursor: "pointer"}}
        onClick={() => {
          dispatch(changeMainOpen("none"));
        }}
      />
      <Flex flex={1} flexDirection={{base: "column", lg: "row"}} align="center">
        <Text
          color={mainStyles.chatHeaderTextColor}
          fontSize={{base: 14, md: 16}}
          fontWeight="500"
          _hover={{cursor: "pointer"}}
          pr={{base: 0, md: "10px"}}
        >
          {displayName}
        </Text>
        <Text color="white" fontSize={{base: 12, md: 16}}>
          Last time online: {displayTime}
        </Text>
      </Flex>
      <HStack align="center" spacing={{base: "5px", md: "15px"}}>
        <Icon
          as={BiSearchAlt2}
          color="white"
          display={{base: "none", md: "block"}}
          boxSize="20px"
          _hover={{cursor: "pointer"}}
        />
        <Icon
          as={FiMoreHorizontal}
          color="white"
          boxSize="28px"
          _hover={{cursor: "pointer"}}
        />
        <Image
          src={avatarSRC}
          boxSize="33px"
          _hover={{cursor: "pointer"}}
          borderRadius="100px"
        ></Image>
      </HStack>
    </Flex>
  );
});

export const BottomBarChat = () => {
  const [message, setMessage] = useState<string>("");
  const [smileIsOpen, changeSmileOpen] = useState<boolean>(false);

  return (
    <Flex onMouseLeave={() => changeSmileOpen(false)} direction="column">
      <EmojiCard
        smileIsOpen={smileIsOpen}
        setMessage={setMessage}
        message={message}
      />
      <Flex
        bg={mainStyles.chatCardSecondBGColor}
        borderTop="1px solid"
        borderColor={mainStyles.chatInputBorderColor}
        borderRadius="0 0 9px 0"
        py={{base: 0, md: 2}}
        px={{base: 2, md: 4}}
      >
        <InputChat
          changeSmileOpen={() => changeSmileOpen(true)}
          setMessage={(value: string) => setMessage(value)}
          message={message}
        />
      </Flex>
    </Flex>
  );
};

const ChatMessges = memo(({user}: any) => {
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  const [messages, setMessages] = useState<any>([]);
  const {currentChat} = useAppSelector((state) => state.mainSlice);
  console.log(currentUser?.uid);
  const combinedUid: any =
    currentUser?.uid?.slice(0, 5) + "" + currentChat?.userID!.slice(0, 5);
  console.log(combinedUid);
  useEffect(() => {
    if (currentChat != null) {
      const getMessages = () => {
        const newChat = onSnapshot(doc(db, "chats", combinedUid), (doc) => {
          let resMessages: any = doc.data();
          let messagesArr = Object.entries(resMessages);
          let sender;

          let res = messagesArr[0][1].map((chat: any) => {
            if (chat.senderId === currentUser.uid) {
              sender = currentUser;
            } else {
              sender = currentChat;
            }

            return (
              <MessageChat
                key={Math.random()}
                message={chat.message}
                time={chat.date}
                user={sender}
              />
            );
            // <Flex>jhkh</Flex>;
          });

          setMessages(res);
        });

        return () => {
          getMessages();
        };
      };

      currentUser.uid && getMessages();
    }
  }, [currentChat]);
  return (
    <Flex direction="column" w="100%" h="100%" flex={1}>
      {messages}
    </Flex>
  );
});

export const MainChat = memo(({user}: any) => {
  const {isOpen} = useAppSelector((state: any) => state.mainSlice);
  return (
    <Flex
      flex={2}
      id="mainChat"
      display={{base: isOpen, md: "flex"}}
      w={"100%"}
      direction="column"
      overflowY="scroll"
      sx={{scrollbarWidth: "none"}}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
          width: "30px",
        },
      }}
    >
      <TopBarChat />
      <Flex
        flex={1}
        px={{base: 3, md: 10}}
        direction="column"
        overflowY="scroll"
        height="100px"
        sx={{scrollbarWidth: "none"}}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
            width: "30px",
          },
        }}
      >
        <ChatMessges />
      </Flex>
      <BottomBarChat />
    </Flex>
  );
});

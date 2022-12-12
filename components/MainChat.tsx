import {
  Flex,
  Avatar,
  Heading,
  Spacer,
  Icon,
  HStack,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import React, {useState, memo, useContext, useEffect} from "react";
import {InputChat} from "../components/InputChat";
import MessageChat from "./MessageChat";
import {mainStyles} from "./LayoutCard";
import {FiMoreHorizontal} from "react-icons/fi";
import {BiSearchAlt2} from "react-icons/bi";
import {HiArrowLeft} from "react-icons/hi";
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
import EmojiCard from "./EmojiCard";

export const TopBarChat = ({displayName, avatarSRC}: any) => {
  if (avatarSRC == "")
    avatarSRC =
      "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099";
  let date = new Date();
  let displayTime: string =
    (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
    ":" +
    (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
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
        display={{base: "block", sm: "none"}}
        boxSize="20px"
        _hover={{cursor: "pointer"}}
        onClick={() => {
          const mainChat: any = document.getElementById("mainChat");
          mainChat.style.display = "none";
          const chatList: any = document.getElementById("chatList");
          chatList.style.display = "flex";
        }}
      />
      <Flex flex={1} flexDirection={{base: "column", md: "row"}} align="center">
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
        <Avatar
          src={avatarSRC}
          boxSize="33px"
          _hover={{cursor: "pointer"}}
        ></Avatar>
      </HStack>
    </Flex>
  );
};

export const BottomBarChat = memo(({user}: any) => {
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
          user={user}
        />
      </Flex>
    </Flex>
  );
});

const ChatMessges = ({user}: any) => {
  const currentUser: any = useContext(AuthContext);
  const [messages, setMessages] = useState<any>([]);
  const combinedUid: any =
    currentUser?.uid?.slice(0, 5) + "" + user?.uid!.slice(0, 5);
  useEffect(() => {
    const getMessages = () => {
      const newChat = onSnapshot(doc(db, "chats", combinedUid), (doc) => {
        let resMessages: any = doc.data();
        let messagesArr = Object.entries(resMessages);
        let sender;

        let res = messagesArr[0][1].map((chat: any) => {
          if (chat.senderId === currentUser.uid) {
            sender = currentUser;
          } else {
            sender = user;
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
        newChat();
      };
    };

    currentUser.uid && getMessages();
  }, [user]);
  return (
    <Flex direction="column" w="100%" h="100%" flex={1}>
      {messages}
    </Flex>
  );
};

export const MainChat = ({user}: any) => {
  return (
    <Flex
      flex={1}
      id="mainChat"
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
      <TopBarChat displayName={user?.displayName} avatarSRC={user?.photoURL} />
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
        <ChatMessges user={user} />
      </Flex>
      <BottomBarChat user={user} />
    </Flex>
  );
};

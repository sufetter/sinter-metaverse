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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, {useState, memo, useEffect, useRef} from "react";
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
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import {AuthContext} from "../../context/AuthContext";
import {EmojiCard} from "../../components/EmojiCard";
import {mainSlice} from "../../src/reducers/MainSlice";
import {useAppDispatch, useAppSelector} from "../../src/hooks/redux";
import {ModalBlockCard} from "../ModalBlock";
import {AnimatePresence} from "framer-motion";
import {AlertCard} from "../Alert";
import {AiOutlineUserAdd} from "react-icons/ai";
import deleteChatIcon from "../../images/deleteChat.png";
import deleteHistoryIcon from "../../images/deleteHistory.png";

export const TopBarChat = memo(() => {
  const {changeMainOpen} = mainSlice.actions;
  const {currentChat} = useAppSelector((state) => state.mainSlice);
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<any>(false);
  const [alertCard, setAlertCard] = useState(<></>);
  const combinedUid: any =
    currentUser?.uid?.slice(0, 5) + "" + currentChat?.userID?.slice(0, 5);
  const combinedUidReverse =
    currentChat?.userID?.slice(0, 5) + currentUser?.uid?.slice(0, 5) + "";

  let avatarSRC = currentChat?.photoURL;
  let alertHeader = "";
  let alertBody = "";
  if (avatarSRC == "" || avatarSRC == undefined) {
    avatarSRC =
      "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099";
  }
  let date = new Date(currentChat?.lastTimeSignIn * 1000);

  let displayTime: string =
    (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
    ":" +
    (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());

  if ((date + "").includes("Invalid")) {
    displayTime = "time not found";
  }

  const deleteChat = async () => {
    setAlert(false);
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedUid]: deleteField(),
    });
    await deleteDoc(doc(db, "chats", combinedUid));
    await updateDoc(doc(db, "userChats", currentChat.userID), {
      [combinedUidReverse]: deleteField(),
    });
    await deleteDoc(doc(db, "chats", combinedUidReverse));
  };
  const deleteChatHistory = async () => {
    await updateDoc(doc(db, "chats", combinedUid), {messages: []});
    await updateDoc(doc(db, "chats", combinedUidReverse), {messages: []});
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedUid + ".lastMessage"]: {
        message: "",
        date: serverTimestamp(),
        sender: currentUser.displayName,
      },
    });
    await updateDoc(doc(db, "userChats", currentChat.userID), {
      [combinedUid + ".lastMessage"]: {
        message: "",
        date: serverTimestamp(),
        sender: currentUser.displayName,
      },
    });
  };
  const addFriend = async () => {
    await updateDoc(doc(db, "userFriends", currentUser.uid), {
      [currentChat.userID]: {
        added: serverTimestamp(),
      },
    });
  };

  return (
    <Flex direction="column-reverse">
      <AnimatePresence>
        {open && (
          <ModalBlockCard>
            <Flex
              _hover={{cursor: "pointer", bg: mainStyles.sidebarBTNSHover}}
              transition="background-color 150ms linear"
              align="center"
              onClick={() => {
                setOpen(false);
                alertHeader = "Chat deletion alert";
                alertBody =
                  "Do you want to delete this? You cant cancel this action in future";

                setAlertCard(
                  <AlertCard header={alertHeader} body={alertBody}>
                    <Flex>
                      <Button
                        colorScheme="teal"
                        variant="outline"
                        mr={2}
                        onClick={() => setAlert(false)}
                        _hover={{bg: mainStyles.mainItemColor}}
                      >
                        <Text color="white">Cancel</Text>
                      </Button>
                      <Button
                        colorScheme="teal"
                        _hover={{bg: mainStyles.mainItemColor}}
                        onClick={deleteChat}
                      >
                        <Text color="white">Delete</Text>
                      </Button>
                    </Flex>
                  </AlertCard>
                );
                setAlert(true);
              }}
            >
              <Image src={deleteChatIcon.src} mx={3} boxSize="20px" />
              <Text color="white" ml={1} my={2}>
                Delete this chat
              </Text>
            </Flex>
            <Flex
              _hover={{cursor: "pointer", bg: mainStyles.sidebarBTNSHover}}
              transition="background-color 150ms linear"
              align="center"
              onClick={() => {
                setOpen(false);
                alertHeader = "ChatHistory deletion alert";
                alertBody =
                  "Do you want to delete history of this chat? You cant cancel this action in future";

                setAlertCard(
                  <AlertCard header={alertHeader} body={alertBody}>
                    <Flex>
                      <Button
                        colorScheme="teal"
                        variant="outline"
                        mr={2}
                        onClick={() => setAlert(false)}
                        _hover={{bg: mainStyles.mainItemColor}}
                      >
                        <Text color="white">Cancel</Text>
                      </Button>
                      <Button
                        colorScheme="teal"
                        _hover={{bg: mainStyles.mainItemColor}}
                        onClick={deleteChatHistory}
                      >
                        <Text color="white">Delete</Text>
                      </Button>
                    </Flex>
                  </AlertCard>
                );
                setAlert(true);
              }}
            >
              <Image src={deleteHistoryIcon.src} mx={3} boxSize="20px" />
              <Text color="white" ml={1} my={2}>
                Delete messages history
              </Text>
            </Flex>
            {/* {friend ? (
              <Flex
                _hover={{cursor: "pointer", bg: mainStyles.sidebarBTNSHover}}
                transition="background-color 150ms linear"
                align="center"
                w="100%"
                onClick={() => {
                  setOpen(false);
                  addFriend();
                }}
              >
                <Icon
                  mx={3}
                  boxSize="20px"
                  color={mainStyles.mainItemColor}
                  as={AiOutlineUserAdd}
                />
                <Text color="white" ml={1} my={2}>
                  Add friend
                </Text>
              </Flex>
            ) : (
              <Flex
                _hover={{cursor: "pointer", bg: mainStyles.sidebarBTNSHover}}
                transition="background-color 150ms linear"
                align="center"
                w="100%"
                onClick={() => {
                  setOpen(false);
                  addFriend();
                }}
              >
                <Icon
                  mx={3}
                  boxSize="20px"
                  color={mainStyles.mainItemColor}
                  as={AiOutlineUserAdd}
                />
                <Text color="white" ml={1} my={2}>
                  Add friend
                </Text>
              </Flex>
            )} */}
            <Flex
              _hover={{cursor: "pointer", bg: mainStyles.sidebarBTNSHover}}
              transition="background-color 150ms linear"
              align="center"
              w="100%"
              onClick={() => {
                setOpen(false);
                addFriend();
              }}
            >
              <Icon
                mx={3}
                boxSize="20px"
                color={mainStyles.mainItemColor}
                as={AiOutlineUserAdd}
              />
              <Text color="white" ml={1} my={2}>
                Add friend
              </Text>
            </Flex>
          </ModalBlockCard>
        )}
      </AnimatePresence>
      <AnimatePresence>{alert && alertCard}</AnimatePresence>
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
        <Flex
          flex={1}
          flexDirection={{base: "column", lg: "row"}}
          align="center"
        >
          <Text
            color={mainStyles.chatHeaderTextColor}
            fontSize={{base: 14, md: 16}}
            fontWeight="500"
            _hover={{cursor: "pointer"}}
            pr={{base: 0, md: "10px"}}
          >
            {currentChat?.displayName}
          </Text>
          <Text color="white" fontSize={{base: 12, lg: 16}}>
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
            onClick={() => setOpen(!open)}
          />
          <Image
            src={avatarSRC}
            boxSize="33px"
            _hover={{cursor: "pointer"}}
            borderRadius="100px"
          ></Image>
        </HStack>
      </Flex>
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

const ChatMessges = memo(() => {
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  const [messages, setMessages] = useState<any>([]);
  const {currentChat} = useAppSelector((state) => state.mainSlice);
  const combinedUid: any =
    currentUser?.uid?.slice(0, 5) + "" + currentChat?.userID!.slice(0, 5);

  useEffect(() => {
    if (currentChat != null) {
      const getMessages = () => {
        const newChat = onSnapshot(doc(db, "chats", combinedUid), (doc) => {
          let resMessages: any = doc.data();
          if (resMessages) {
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
          } else {
            setMessages(<></>);
          }
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

export const MainChat = memo(() => {
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

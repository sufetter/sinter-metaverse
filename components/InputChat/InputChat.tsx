import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Icon,
  Box,
  Image,
  FormLabel,
  Text,
  Textarea,
  CircularProgress,
} from "@chakra-ui/react";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {useAppSelector} from "../../src/hooks/redux";
import React, {useState, useEffect, useRef} from "react";
import {AuthContext} from "../../context/AuthContext";
import {
  HiOutlineEmojiHappy,
  HiOutlineMicrophone,
  HiOutlinePaperClip,
} from "react-icons/hi";
import {mainStyles} from "../Layout";
import {db, storage} from "../../firebaseconfig";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {v4 as uuid} from "uuid";
import {BsUpload} from "react-icons/bs";

interface MainInput {
  changeSmileOpen: () => void;
  setMessage: (value: string) => void;
  message: string;
  setMainComponent?: any;
}
export const InputChat: React.FC<MainInput> = ({
  changeSmileOpen,
  setMessage,
  message,
}) => {
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
  const {currentChat} = useAppSelector((state) => state.mainSlice);
  const input = useRef(null);
  const inputFile: any = useRef();

  useEffect(() => {
    const msg: any = input.current;
    msg.style.height = "2.5rem";
    msg.style.height = msg.scrollHeight + 2 + "px";
  }, [message]);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value.replace(/\r?\n/g, ""));
  };
  const combinedUid: any =
    currentUser?.uid?.slice(0, 5) + "" + currentChat?.userID!.slice(0, 5);
  const combinedUidReverse =
    currentChat?.userID!.slice(0, 5) + currentUser?.uid?.slice(0, 5) + "";

  const handleSend = async () => {
    message = message.trim();
    if (message == "") {
      return;
    }
    await updateDoc(doc(db, "chats", combinedUid), {
      messages: arrayUnion({
        id: uuid(),
        message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, "chats", combinedUidReverse), {
      messages: arrayUnion({
        id: uuid(),
        message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedUid + ".lastMessage"]: {
        message,
        sender: currentUser.displayName,
        date: serverTimestamp(),
      },
    });
    await updateDoc(doc(db, "userChats", currentChat.userID), {
      [combinedUidReverse + ".lastMessage"]: {
        message,
        sender: currentUser.displayName,
        date: serverTimestamp(),
      },
    });
    setMessage("");
  };

  const handleKey = async (e: any) => {
    e.code === "Enter" && handleSend();
  };

  const handleFileComponent = () => {
    setMainComponent(!mainComponent);
  };

  const handleFile = (e: any) => {
    if (e.target.files[0]?.type == undefined) return;
    let file = e.target.files![0];
    if (file?.type.includes("image") && Math.round(file.size / 1000) < 5000) {
      setFileChecked(true);
      setFileName("Your File is: " + file.name);
      let avatarPath = URL.createObjectURL(file);
      setImagePreview(avatarPath);
    } else {
      setFileName("Not valid file, please, upload Image (up to 5mb)");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let fileCheck = inputFile?.current!.files![0];
    let fileName = fileCheck?.name;
    try {
      const storageRef = ref(
        storage,
        currentUser.displayName +
          "." +
          currentChat.userID.slice(0, 5) +
          "." +
          fileName
      );

      if (fileCheck && fileChecked) {
        setButtonIcon(
          <CircularProgress
            value={progress}
            size="30px"
            color={mainStyles.mainItemColor}
          />
        );
        const uploadTask = uploadBytesResumable(storageRef, fileCheck);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                // console.log("Upload is running");
                break;
            }
          },
          (err) => {
            console.log(err);
            console.log(err.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                setProgress(0);
                setButtonIcon(
                  <Icon
                    as={BsUpload}
                    boxSize="20px"
                    color={mainStyles.chatCardBG}
                  />
                );
                await updateDoc(doc(db, "chats", combinedUid), {
                  messages: arrayUnion({
                    id: uuid(),
                    message: downloadURL,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                  }),
                });
                await updateDoc(doc(db, "chats", combinedUidReverse), {
                  messages: arrayUnion({
                    id: uuid(),
                    message: downloadURL,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                  }),
                });
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                  [combinedUid + ".lastMessage"]: {
                    message: "File",
                    sender: currentUser.displayName,
                    date: serverTimestamp(),
                  },
                });
                await updateDoc(doc(db, "userChats", currentChat.userID), {
                  [combinedUidReverse + ".lastMessage"]: {
                    message: "File",
                    sender: currentUser.displayName,
                    date: serverTimestamp(),
                  },
                });
              }
            );
          }
        );
      }
    } catch (error: any) {
      console.log(error.message);
      console.log(error.message.includes("network"));
    }
  };

  const [mainComponent, setMainComponent] = useState<any>(true);
  const [fileName, setFileName] = useState("Choose any file");
  const [fileChecked, setFileChecked] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sinter-metaverse.appspot.com/o/user.png?alt=media&token=516be896-9714-4101-ab89-f2002fe7b099"
  );
  const [progress, setProgress] = useState(0);
  const [buttonIcon, setButtonIcon] = useState(
    <Icon as={BsUpload} boxSize="20px" color={mainStyles.chatCardBG} />
  );

  return (
    <Flex w="100%">
      <Flex mb="7px" align="end">
        <Icon
          as={HiOutlinePaperClip}
          color={mainStyles.mainIconColor}
          boxSize="24px"
          _hover={{cursor: "pointer"}}
          onClick={handleFileComponent}
        />
      </Flex>
      <Flex
        display={mainComponent ? "none" : "flex"}
        align="center"
        justify="center"
        w="100%"
      >
        <Image src={imagePreview} maxH="40px" mr={2} />
        <FormLabel htmlFor="Avatar">
          <Input
            type="file"
            color="white"
            border="white"
            cursor="pointer"
            onChange={handleFile}
            display="none"
            id="Avatar"
            ref={inputFile}
          ></Input>

          <Text
            align="center"
            color="white"
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            flexWrap="wrap"
          >
            {fileName}
          </Text>
        </FormLabel>
        <Button
          bg={mainStyles.mainIconColor}
          onClick={handleSubmit}
          px={0}
          py={0}
        >
          <Flex>{buttonIcon}</Flex>
        </Button>
      </Flex>
      <Flex width="100%" px={2} display={mainComponent ? "flex" : "none"}>
        <Textarea
          position="relative"
          placeholder="Type a message....."
          id="message"
          border={{base: 0, md: "1px solid" + mainStyles.chatInputBorderColor}}
          _focus={{borderWidth: "1px"}}
          focusBorderColor={mainStyles.chatInputBorderColor}
          autoComplete="off"
          color="white"
          onChange={handleMessageChange}
          _hover={{borderColor: mainStyles.chatInputBorderColor}}
          value={message}
          onKeyDown={handleKey}
          minH={0}
          maxH={200}
          pr={8}
          resize="none"
          ref={input}
          sx={{scrollbarWidth: "none"}}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
              width: "30px",
            },
          }}
        ></Textarea>
        <Flex zIndex="1" ml={-8} mb={"7.5px"} align="end">
          <Icon
            as={HiOutlineEmojiHappy}
            color={mainStyles.mainIconColor}
            boxSize="25px"
            _hover={{cursor: "pointer"}}
            onMouseOver={changeSmileOpen}
          />
        </Flex>
      </Flex>
      <Flex align="end" mb="7px" display={mainComponent ? "flex" : "none"}>
        <Icon
          as={HiOutlineMicrophone}
          color={mainStyles.mainIconColor}
          boxSize="24px"
          _hover={{cursor: "pointer"}}
          mb="1px"
        />
      </Flex>
    </Flex>
  );
};

import React, {useEffect, useState, useRef} from "react";
import Link from "next/link";
import {
  Heading,
  Box,
  Flex,
  Center,
  Text,
  Button,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  Spacer,
  Image,
  Progress,
} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {AttachmentIcon} from "@chakra-ui/icons";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import imageIcon from "../images/imageIcon.png";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import {auth, storage, db} from "../firebaseconfig";
import {doc, setDoc} from "firebase/firestore";
import {useRouter} from "next/router";
import {FcAddImage} from "react-icons/fc";
import {mainStyles} from "./LayoutCard";

function RegisterCard() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(
    "Please, choose your avatar (optional)"
  );
  const [imagePreview, setImagePreview] = useState<string>(imageIcon.src);
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [passwordAlerter, setPasswordAlerter] = useState<string>(
    "Please, enter your password. Min length 6 is required."
  );
  const [fileChecked, setFileChecked] = useState(false);
  const router = useRouter();
  const inputFile: any = useRef(null);

  // MAIN FUNCTIONS

  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const handlePasswordRepeat = (e: any) => {
    setPasswordRepeat(e.target.value);
  };

  const handleShow = () => setShow(!show);

  const navigate = (href: string) => {
    router.push(`${href}`);
  };

  const handleDisplayNameChange = (e: any) => setDisplayName(e.target.value);

  // FB State Locator
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // navigate("/chat/" + user.displayName + "." + user.uid.slice(0, 5));
    } else {
      // navigate();
    }
  });

  const handlePasswordChange = (e: any) => {
    let str: string = e.target.value;
    setPassword(str);
    if (str.length < 6) {
      setPasswordAlerter(
        "Please, enter your password. Min length 6 is required."
      );
    } else if (
      str.search(/[A-Z]/) == -1 ||
      str.search(/[a-z]/) == -1 ||
      str.search(/[0-9]/) == -1
    ) {
      setPasswordAlerter(
        "Password must contain at least one uppercase and lowercase letter and a number."
      );
    }
  };

  const handleFileChange = (e: any) => {
    if (e.target.files[0]?.type == undefined) return;
    file[0] = e.target.files![0];

    if (
      file[0]?.type.includes("image") &&
      Math.round(file[0].size / 1000) < 5000
    ) {
      setFileChecked(true);
      setAvatar("Your Avatar is: " + file[0].name);
      let avatarPath = URL.createObjectURL(file[0]);
      setImagePreview(avatarPath);
    } else {
      setAvatar("Not valid file, please, upload Image (up to 5mb)");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    fileCheck = inputFile?.current!.files![0];
    fileName = fileCheck?.name;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(res.user);
      const storageRef = ref(
        storage,
        displayName + "." + res.user.uid.slice(0, 5) + "." + fileName
      );

      if (fileCheck && fileChecked) {
        const uploadTask = uploadBytesResumable(storageRef, fileCheck);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (err) => {
            setError(true);
            console.log(err);
            console.log(err.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                // console.log("File available at", downloadURL);
                // console.log(res.user);
                await updateProfile(res.user, {
                  displayName: displayName,
                  photoURL: downloadURL,
                });
                // await setDoc(doc(db, "users", res.user.uid), {
                //   userID: res.user.uid,
                //   displayName,
                //   email,
                //   photoURL: downloadURL,
                // });

                // await setDoc(doc(db, "userChats", res.user.uid), {});
              }
            );
          }
        );
      } else {
        await updateProfile(res.user, {
          displayName: displayName,
        });
        // await setDoc(doc(db, "users", res.user.uid), {
        //   userID: res.user.uid,
        //   displayName,
        //   email,
        // });
      }

      // await setDoc(doc(db, "userChats", res.user.uid), {});

      // navigate(displayName + "." + res.user.uid.slice(0, 5));
      navigate("/verefication");
    } catch (error: any) {
      setError(true);
      console.log(error.message);
      console.log(error.message.includes("network"));
    }
  };

  // VARIABELS

  const isErrorEmail: boolean = email === "";
  const isPassowordShort: boolean = password.length < 6;
  const areBigLetters: boolean = password.search(/[A-Z]/) !== -1;
  const areLittleLetters: boolean = password.search(/[a-z]/) !== -1;
  const areNumbers: boolean = password.search(/[0-9]/) !== -1;
  const isPasswordReliable: boolean =
    areBigLetters && areLittleLetters && areNumbers;
  const passwordProgress: number =
    ((password.length > 6 ? 6 : password.length) * 50) / 6 +
    (50 *
      (Number(areBigLetters) + Number(areLittleLetters) + Number(areNumbers))) /
      3;
  const isErrorPassword: boolean = isPassowordShort || !isPasswordReliable;
  const isErrorPasswordRepeat: boolean = passwordRepeat != password;
  const isErrorNickname: boolean = displayName === "";
  let file: Array<File> = [];
  let fileName: string | any = "";
  let fileCheck: File | any;

  // MAIN UI
  return (
    <Flex w="100%" flex={"1 1 auto"} h="100%" align="center" justify="center">
      <Flex
        minWidth="400px"
        maxW={"400px"}
        border="2px solid"
        borderColor={mainStyles.cardBorder}
        borderRadius="10px"
      >
        <Box
          maxW={"470px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          flex={1}
        >
          <Box p={4}>
            <Heading
              fontSize={"38px"}
              fontWeight={500}
              fontFamily={"body"}
              color="white"
              mb="5"
            >
              Register
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={isErrorNickname}>
                <Input
                  type="text"
                  value={displayName}
                  onChange={handleDisplayNameChange}
                  placeholder="Your nickname"
                  bg="#224957"
                />
                {!isErrorNickname ? (
                  <FormHelperText mb="2">Nice one.</FormHelperText>
                ) : (
                  <FormErrorMessage mb="2">
                    We need any nickname for you.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isErrorEmail}>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  bg="#224957"
                />
                {!isErrorEmail ? (
                  <FormHelperText mb="2">Email is checked.</FormHelperText>
                ) : (
                  <FormErrorMessage mb="2">Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isErrorPassword}>
                <InputGroup mb={2}>
                  <Input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    bg="#224957"
                    w="100%"
                  />
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShow}
                    p="20px"
                    disabled={password.length < 1}
                    ml={2}
                    minW="70px"
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputGroup>
                {!isErrorPassword ? (
                  <FormHelperText mb={2}>Password is correct</FormHelperText>
                ) : (
                  <FormErrorMessage mb={2}>{passwordAlerter}</FormErrorMessage>
                )}
              </FormControl>
              <Box bg="#224957" w="100%" h="5px" mb="14px">
                <Box
                  bg={`rgb(${
                    (255 *
                      (passwordProgress > 66 ? 100 - passwordProgress : 33)) /
                    33
                  }, ${
                    (255 *
                      (passwordProgress > 33 ? passwordProgress - 33 : 0)) /
                    33
                  }, 0)`}
                  w={passwordProgress + "%"}
                  h="100%"
                  border-radius="10px"
                  transition={`width 0.3s linear`}
                ></Box>
              </Box>
              <FormControl isInvalid={isErrorPasswordRepeat}>
                <Input
                  type={show ? "text" : "password"}
                  value={passwordRepeat}
                  onChange={handlePasswordRepeat}
                  placeholder="Repeat your Password"
                  bg="#224957"
                  w="100%"
                />
                {!isErrorPasswordRepeat ? (
                  <FormHelperText mb={2}>
                    The entered passwords match each other.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage mb={2}>
                    Please repeat your password.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Stack direction="row" align="center" m={2}>
                <Image
                  boxSize="70px"
                  objectFit="cover"
                  src={imagePreview}
                  borderRadius="10px"
                />

                {/* <FcAddImage size="80px" display="none" /> */}
                <FormLabel htmlFor="Avatar" w="100%">
                  <Input
                    type="file"
                    color="white"
                    border="white"
                    cursor="pointer"
                    onChange={handleFileChange}
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
                    {avatar}
                  </Text>
                </FormLabel>
              </Stack>

              <Stack direction="row" mt={2}>
                <Text color="#224957" fontSize={14} fontWeight="bold">
                  Have an account?
                </Text>
                <Spacer />
                <Link href="/login">
                  <a>
                    <Text
                      color={mainStyles.secondTextColor}
                      fontWeight="660"
                      _hover={{textDecoration: "underline"}}
                    >
                      Login
                    </Text>
                  </a>
                </Link>
              </Stack>
              <Button
                type="submit"
                w={"full"}
                mt={5}
                bg={mainStyles.mainItemColor}
                color={"white"}
                rounded={"md"}
                disabled={submit}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
export default RegisterCard;

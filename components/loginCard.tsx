import React, {useState, useContext} from "react";
import Link from "next/link";
import {
  Heading,
  useColorModeValue,
  Box,
  Image,
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
  InputRightElement,
  InputGroup,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";
import {auth} from "../firebaseconfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "next/router";
import {navigate} from "./LayoutCard";
import SingupGoogle from "./SingupGoogle";
import {useAppSelector} from "../src/hooks/redux";

function loginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [submit, setSubmit] = useState(false);
  const [passwordError, setPasswordError] = useState("Password is required");
  const [emailError, setEmailError] = useState("Email is required");

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleShow = () => setShow(!show);
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/chat/" + user?.displayName + "." + user?.uid.slice(0, 5));
        }
      );
    } catch (error: any) {
      setError(true);
      if (error.message.includes("password")) {
        setPassword("");
        setPasswordError("Wrong Password");
      } else if (error.message.includes("user-not-found")) {
        setEmail("");
        setEmailError("No user found");
      }
      console.log(error.message);
      console.log(error.code);
    }
  };

  const isErrorEmail = email === "";
  const isErrorPssword = password === "";

  return (
    <Flex
      flex={1}
      w="100%"
      align="center"
      justify="center"
      bg={mainStyles.mainBGColor}
      overflowY="scroll"
      sx={{scrollbarWidth: "none"}}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
          width: "30px",
        },
      }}
    >
      <Flex
        border={{base: "0px solid", sm: "2px solid " + mainStyles.cardBorder}}
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
              fontSize={{base: "30px", sm: "38px"}}
              fontWeight={500}
              fontFamily={"body"}
              color="white"
              mb={{base: 2, sm: 5}}
              mt={{base: -4, sm: "auto"}}
            >
              Login
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={isErrorEmail}>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  bg="#224957"
                />
                {!isErrorEmail ? (
                  <FormHelperText mb="2">
                    Enter your email address.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage mb="2">{emailError}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isErrorPssword}>
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
                    disabled={isErrorPssword}
                    ml={2}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputGroup>
                {!isErrorPssword ? (
                  <FormHelperText mb={2}>Enter your password.</FormHelperText>
                ) : (
                  <FormErrorMessage mb={2}>{passwordError}</FormErrorMessage>
                )}
              </FormControl>

              <Stack direction="row">
                <Checkbox defaultChecked color="white">
                  Remember me
                </Checkbox>
                <Spacer />
                <Link color="#FFE927" href="/reset">
                  <a>
                    <Text
                      color={mainStyles.reservTextColor}
                      fontWeight="660"
                      _hover={{textDecoration: "underline"}}
                    >
                      Forgot Pssword?
                    </Text>
                  </a>
                </Link>
              </Stack>
              <Stack direction="row" mt={2}>
                <Text color="#224957" fontSize={14} fontWeight="bold">
                  Do you want to register?
                </Text>
                <Spacer />
                <Link href="/register">
                  <a>
                    <Text
                      color={mainStyles.secondTextColor}
                      fontWeight="660"
                      _hover={{textDecoration: "underline"}}
                    >
                      Register
                    </Text>
                  </a>
                </Link>
              </Stack>
              <Button
                type="submit"
                w={"full"}
                mt={{base: 2, sm: 5}}
                bg={mainStyles.mainItemColor}
                color={"white"}
                rounded={"md"}
                disabled={submit}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Login
              </Button>
              <Flex
                h={{base: "5px", sm: "35px"}}
                align="center"
                justify="center"
              >
                <Text
                  display={{base: "none", sm: "block"}}
                  color={mainStyles.mainTextColor}
                  textAlign="center"
                  pb={1}
                >
                  or
                </Text>
              </Flex>
              <SingupGoogle />
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
export default loginCard;

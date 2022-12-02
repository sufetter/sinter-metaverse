import React, {useContext} from "react";
import Link from "next/link";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Stack,
  Checkbox,
  Spacer,
  Button,
  Icon,
  Image,
} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";
import {AuthContext} from "../context/AuthContext";
import resetPasswordIcon from "../images/resetPasswordIcon.png";
import {auth} from "../firebaseconfig";
import {sendPasswordResetEmail} from "firebase/auth";

const ResetPasswordCard = () => {
  const currentUser: any = useContext(AuthContext);
  const handleReset = () => {
    sendPasswordResetEmail(auth, currentUser.email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <Flex
      flex={1}
      w="100%"
      align="center"
      justify="center"
      bg={mainStyles.mainBGColor}
    >
      <Flex
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
            >
              Reset Password
            </Heading>
            <form>
              <Flex align="center" justify="center" my={3}>
                <Image src={resetPasswordIcon.src} boxSize="100px" />
              </Flex>
              <Flex>
                <Text
                  color={mainStyles.mainTextColor}
                  fontSize="20px"
                  lineHeight="23px"
                  textAlign="justify"
                >
                  Click on a button and we will send you an email with a link to
                  reset your password.
                </Text>
              </Flex>
              <Stack direction="row" my={3}>
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
                bg={mainStyles.mainItemColor}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Reset
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ResetPasswordCard;

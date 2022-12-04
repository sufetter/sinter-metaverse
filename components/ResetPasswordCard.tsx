import React, {useContext, useState, useEffect} from "react";
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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  extendTheme,
} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";
import {AuthContext} from "../context/AuthContext";
import resetPasswordIcon from "../images/resetPasswordIcon.png";
import {auth} from "../firebaseconfig";
import {sendPasswordResetEmail} from "firebase/auth";
import ModalCard from "./ModalCard";

const ResetPasswordCard = () => {
  const currentUser: any = useContext(AuthContext);
  const [modal, setModal] = useState<any>();
  const [disabled, setDisabled] = useState(false);

  const handleReset = () => {
    if (!currentUser.providerData) return;
    if (currentUser.providerData[0].providerId.includes("google")) {
      let components = (
        <Flex justify="space-between" mt={3}>
          <Text color="white">You can go to chat page</Text>
          <Link
            href={currentUser.displayName + "." + currentUser.uid.slice(0, 5)}
          >
            <a>
              <Text color="white">Go</Text>
            </a>
          </Link>
        </Flex>
      );
      setModal(
        <ModalCard
          open
          header={"Reset error"}
          body={`You are logged by ${currentUser.providerData[0].providerId}, unfortunately we cannot reset your password. Please contact support ${currentUser.providerData[0].providerId} to resolve this issue.`}
          components={components}
          modal={modal}
        />
      );
      setDisabled(true);
    } else
      sendPasswordResetEmail(auth, currentUser.email)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
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
            {modal}
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
                  Do you want to login?
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
                w={"full"}
                bg={mainStyles.mainItemColor}
                color={"white"}
                rounded={"md"}
                disabled={disabled}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={handleReset}
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

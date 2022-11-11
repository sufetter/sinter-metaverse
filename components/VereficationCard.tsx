import {auth} from "../firebaseconfig";
import {onAuthStateChanged, sendEmailVerification} from "firebase/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";

import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Spinner,
  useRadio,
} from "@chakra-ui/react";
import {checkCustomRoutes} from "next/dist/lib/load-custom-routes";

const VereficationCard = () => {
  const navigate = (href: string) => {
    router.push(`${href}`);
  };
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        navigate("/chat/" + user.displayName + "." + user.uid.slice(0, 5));
      }

      console.log(user.emailVerified);
      console.log(user);
    } else {
      console.log("wtf");
    }
  });

  useEffect(() => {
    let check = setInterval(() => {
      auth.currentUser?.reload();

      let user = auth.currentUser;
      console.log(user?.emailVerified);
      if (auth.currentUser?.emailVerified) {
        navigate("/chat/" + user?.displayName + "." + user?.uid.slice(0, 5));
        return () => clearInterval(check);
      }
    }, 2000);
    return;
  });

  return (
    <Flex
      w="100%"
      flex={"1 1 auto"}
      h="100%"
      align="center"
      justify="center"
      mt="-60px"
      onClick={() => {
        auth.currentUser?.reload();
        console.log(auth.currentUser?.emailVerified);
      }}
    >
      <Flex minWidth="400px" maxW={"400px"}>
        <Box
          maxW={"470px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          flex={1}
        >
          <Heading
            fontSize={"38px"}
            fontWeight={500}
            fontFamily={"body"}
            color="white"
            mb="5"
          >
            Email Verification
          </Heading>
          <Box>
            <Text color="white">
              We have sent you an email with a link to verify your mail. Please
              check your mail.
            </Text>
            <Button w="100%" mt={3} bg="#FE6060">
              <Spinner />
            </Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default VereficationCard;

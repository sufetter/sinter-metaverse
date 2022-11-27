import {useContext} from "react";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {auth} from "../firebaseconfig";
import {AuthContext} from "../context/AuthContext";
import {Button, Flex, Icon, Text} from "@chakra-ui/react";
import {mainStyles} from "./LayoutCard";
import {FcGoogle} from "react-icons/fc";

const provider = new GoogleAuthProvider();

const handleSubmit = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
const SingupGoogle = () => {
  const currentUser: any = useContext(AuthContext);
  // console.log(currentUser);
  return (
    <Button
      onClick={handleSubmit}
      bg={mainStyles.singupGoogleBG}
      w="100%"
      borderRadius="3px"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
    >
      <Flex justify="center" align="center">
        <Text pr={2} fontWeight="500">
          Sing in with Google
        </Text>
        <Icon as={FcGoogle} boxSize={"20px"} />
      </Flex>
    </Button>
  );
};

export default SingupGoogle;

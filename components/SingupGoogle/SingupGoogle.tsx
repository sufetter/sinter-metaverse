import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {collection, query, where, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebaseconfig";
import {AuthContext} from "../../context/AuthContext";
import {Button, Flex, Icon, Text} from "@chakra-ui/react";
import {mainStyles} from "../Layout";
import {FcGoogle} from "react-icons/fc";
import {useAppSelector} from "../../src/hooks/redux";

const provider = new GoogleAuthProvider();

const handleSubmit = async () => {
  await signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;
      let existed: Array<Object> = [];
      const queryDB = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot: any = await getDocs(queryDB);
      querySnapshot.forEach((doc: any) => {
        existed.push(doc.data());
      });

      if (existed.length! == 0) {
        setDoc(doc(db, "users", user.uid), {
          userID: user.uid,
          displayName: user.displayName,
          displayNameLC: user.displayName?.toLowerCase(),
          email: user.email,
          photoURL: user.photoURL,
        });
        await setDoc(doc(db, "userChats", user.uid), {});
      }
      await setDoc(doc(db, "userFriends", user.uid), {});

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(error);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData?.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
export const SingupGoogle = () => {
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);
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

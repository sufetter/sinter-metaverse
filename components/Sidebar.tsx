import {
  Flex,
  Icon,
  Text,
  Box,
  Tooltip,
  ChakraProvider,
  Spacer,
} from "@chakra-ui/react";
import React, {useContext, memo} from "react";
import {CgProfile} from "react-icons/cg";
import {FiMessageSquare, FiSettings} from "react-icons/fi";
import {BsNewspaper} from "react-icons/bs";
import {FaUserFriends} from "react-icons/fa";
import {GoFileMedia} from "react-icons/go";
import {MdOutlineLogout} from "react-icons/md";
import {mainStyles, navigate} from "./LayoutCard";
import {signOut} from "firebase/auth";
import {auth} from "../firebaseconfig";
import {useAppSelector} from "../src/hooks/redux";

type SideBarItemProps = {
  icon?: JSX.Element | any;
  desc?: string;
  onClick?: any;
};

export const SidebarItem = ({icon, desc, onClick}: SideBarItemProps) => {
  return (
    <Flex
      w={{base: "auto", sm: "120px", md: "140px"}}
      mb={2}
      mr={{base: 1, sm: 3, lg: 2}}
      p={1.5}
      bg={mainStyles.sidebarBTNS}
      align="center"
      borderRadius="5px"
      transition="background-color 100ms linear"
      _hover={{
        cursor: "pointer",
        bg: mainStyles.sidebarBTNSHover,
      }}
      onClick={onClick}
    >
      <Icon boxSize={"20px"} color={mainStyles.mainItemColor} as={icon} />
      <Text
        display={{base: "none", sm: "block"}}
        color={mainStyles.mainTextColor}
        pl={3}
        fontSize="14px"
      >
        {desc}
      </Text>
    </Flex>
  );
};

const Sidebar = () => {
  const {currentUser} = useAppSelector((state) => state.userAuthSlice);

  const {isOpen} = useAppSelector((state) => state.mainSlice);
  return (
    <Flex
      display={{base: isOpen === "none" ? "flex" : "none", sm: "flex"}}
      ml={{base: 1, sm: 3, lg: 0}}
      mt={{base: 1, sm: 3, lg: 0}}
      mb={{base: 0, sm: 2, lg: 0}}
      direction="column"
    >
      <SidebarItem icon={CgProfile} desc="My Profile" />
      <SidebarItem icon={BsNewspaper} desc="News" />
      <SidebarItem icon={FiMessageSquare} desc="Messages" />
      <SidebarItem icon={FaUserFriends} desc="Friends" />
      <SidebarItem icon={GoFileMedia} desc="Media Files" />
      <Spacer />
      <SidebarItem icon={FiSettings} desc="Settings" />
      <SidebarItem
        icon={MdOutlineLogout}
        desc="Logout"
        onClick={() => {
          signOut(auth);
          // navigate("/login");
        }}
      />
    </Flex>
  );
};

export default memo(Sidebar);

import {
  Flex,
  Icon,
  Text,
  Box,
  Tooltip,
  ChakraProvider,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import {CgProfile} from "react-icons/cg";
import {FiMessageSquare, FiSettings} from "react-icons/fi";
import {BsNewspaper} from "react-icons/bs";
import {FaUserFriends} from "react-icons/fa";
import {GoFileMedia} from "react-icons/go";
import {MdOutlineLogout} from "react-icons/md";
import {mainItemColor} from "./LayoutCard";

type SideBarItemProps = {
  icon?: JSX.Element | any;
  desc?: string;
};

export const SidebarItem = ({icon, desc}: SideBarItemProps) => {
  return (
    <Tooltip hasArrow label={desc} bg="gray.300" color="black">
      <Flex
        _hover={{cursor: "pointer"}}
        mb={2}
        mr={2}
        borderRadius="100px"
        p={2}
        bg="white"
        align="center"
      >
        <Icon boxSize={"25px"} color={mainItemColor} as={icon} />
      </Flex>
    </Tooltip>
  );
};

const Sidebar = () => {
  const ref = React.createRef();
  return (
    <Flex borderEnd="1px solid" borderColor={"#C1402F"} direction="column">
      <SidebarItem icon={CgProfile} desc="My Profile" />
      <SidebarItem icon={BsNewspaper} desc="News" />
      <SidebarItem icon={FiMessageSquare} desc="Messages" />
      <SidebarItem icon={FaUserFriends} desc="Friends" />
      <SidebarItem icon={GoFileMedia} desc="Media Files" />
      <Spacer />
      <SidebarItem icon={FiSettings} desc="Settings" />
      <SidebarItem icon={MdOutlineLogout} desc="LogOut" />
    </Flex>
  );
};

export default Sidebar;

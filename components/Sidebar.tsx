import {Flex, Icon, Text, Box, Tooltip, ChakraProvider} from "@chakra-ui/react";
import React from "react";
import {CgProfile} from "react-icons/cg";
import {FiMessageSquare} from "react-icons/fi";
import {forwardRef} from "react";

type SideBarItemProps = {
  icon?: JSX.Element | any;
  desc?: string;
};

export const SidebarItem = ({icon, desc}: SideBarItemProps) => {
  return (
    <Tooltip hasArrow label={desc} bg="gray.300" color="black">
      <Box>
        <Icon boxSize={"25px"} color="white" as={icon} />
      </Box>
    </Tooltip>
  );
};

const Sidebar = () => {
  const ref = React.createRef();
  return (
    <ChakraProvider>
      <Flex borderEnd="1px solid" borderColor={"#C1402F"} direction="column">
        <SidebarItem icon={CgProfile} desc="HELLO" />
        <SidebarItem icon={FiMessageSquare} />
      </Flex>
    </ChakraProvider>
  );
};
//
export default Sidebar;

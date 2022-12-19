import {Button, Flex, List, ListItem, Text} from "@chakra-ui/react";
import React from "react";

type SettingItemProps = {
  text: string;
  children?: JSX.Element;
};

export const SettingsItem = ({text, children}: SettingItemProps) => {
  return (
    <ListItem>
      <Text color="white">{text}</Text>
      {children}
    </ListItem>
  );
};

export const ChatSettings = () => {
  return (
    <Flex direction="column" flex={0.4}>
      <Flex direction="column" align="left">
        <List>
          <SettingsItem text="All Chats" />
        </List>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

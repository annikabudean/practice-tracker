import React from 'react';
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from "../theme/theme";
import { Icon } from 'react-native-vector-icons/Icon';

type FooterProps = {
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
};

type IconType = 'Foundation' | 'Ionicons' | 'Feather';


export default function Footer({ activePage, setActivePage }: FooterProps) {
  const router = useRouter();

  const iconMap: Record<IconType, typeof Icon> = {
    Foundation, 
    Ionicons,
    Feather
  }

  const footerButtons = [
    {
      label: "Home",
      iconName: "home-outline",
      activeIconName: "home",
      iconType: "Ionicons",
      screen: "/home",
      key: "home",
    },
    {
      label: "Start Session",
      iconName: "play-circle-outline",
      activeIconName: "play-circle-sharp",
      iconType: "Ionicons",
      screen: "/session",
      key: "session",
    },
    {
      label: "Notes",
      iconName: "journal-outline",
      activeIconName: "journal",
      iconType: "Ionicons",
      screen: "/notes",
      key: "notes",
    },
  ];

  return (
    <View style={styles.footer}>
      {footerButtons.map((btn) => {
        const IconComponent = iconMap[btn.iconType];
        const color = activePage === btn.key ? theme.colors.primary[500] : theme.colors.text[900];
        const iconName = activePage === btn.key ? btn.activeIconName || btn.iconName : btn.iconName; 

        return (
          <Pressable
            key={btn.key}
            onPress={() => {
              setActivePage(btn.key);
              router.replace(btn.screen); // use replace if you don't want back animation
            }}
            style={({ pressed }) => ({
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <IconComponent name={iconName} size={24} color={color} />
              <Text style={{ marginTop: 4, color }}>{btn.label}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background[50],
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: theme.colors.background[300],
    paddingHorizontal: 50,
    height: 80,
    paddingBottom: 25,
    paddingTop: 15,
  },
});
import React from 'react';
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type FooterProps = {
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
};

export default function Footer({ activePage, setActivePage }: FooterProps) {
  const router = useRouter();
  
  const footerButtons = [
    {
      label: "Home",
      icon: <Foundation name="home" size={activePage === "home" ? 25 : 20} color="black" />,
      screen: "/home",
      key: "home",
    },
    {
      label: "Start Session",
      icon: <Ionicons name="play-circle-sharp" size={activePage === "session" ? 25 : 20} color="black" />,
      screen: "/session",
      key: "session",
    },
    {
      label: "Notes",
      icon: <Ionicons name="journal" size={activePage === "notes" ? 25 : 20} color="black" />,
      screen: "/notes",
      key: "notes",
    },
  ];


  return (
    <View style={styles.footer}>
      {footerButtons.map((btn) => (
        <Pressable
          key={btn.key}
          onPress={() => {
            setActivePage(btn.key);
            router.push(btn.screen);
          }}
          style={({ pressed }) => ({
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            {btn.icon}
            <Text style={{ marginLeft: 4 }}>{btn.label}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eee',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    margin: 0,
    width: '100%',
  },
  footerIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
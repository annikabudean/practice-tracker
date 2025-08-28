import React, { useState } from 'react';
import { Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HamburgerMenu from '../components/HamburgerMenu';
import Card from '../components/Card';
import Profile from '../components/Profile';
import Footer from '../components/Footer';


export default function Session() {
    const [activePage, setActivePage] = useState("session")

    return (
        <View style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />

            <Text> hello </Text>

            <Footer activePage={activePage} setActivePage={setActivePage} />

        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
import React, { useEffect, useState } from 'react';
import { Stack } from "expo-router";
import { Button, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import HamburgerMenu from '../components/HamburgerMenu';
import Card from '../components/Card';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import { theme } from "../theme/theme";
import { getPracticeSessions } from '@/services/practiceSessionsService';


interface PracticeSession {
  id: number; 
  created_at: string; 
  user_id: string; 
  start_time: string; 
  end_time: string; 
  duration: number; 
  instrument: string; 
}


export default function PracticeSession() {
    const [activePage, setActivePage] = useState("practiceSession")
    const [modalVisible, setModalVisible] = useState(false);
    const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);

    useEffect(() => {
      async function loadPracticeSessions() {
        const practiceSessions = await getPracticeSessions();
        setPracticeSessions(practiceSessions ?? []);
      }
      loadPracticeSessions();
    }, [practiceSessions]);


    const PracticeDuration = (minutes: number) => {
      if (minutes < 60) {
        return `${minutes} minutes`
      } else {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60; 
        return mins === 0 ? `${hours}` : `${hours} hour ${mins} minutes`
      }
    }

    return (
        <View style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          <FlatList 
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: 100,
            }}
            ListFooterComponent={
              <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                  <Text style={styles.buttonText}>Start a Practice Session!</Text>
              </Pressable>
            }
            style={styles.list}
            data={practiceSessions}
            keyExtractor={(item) => item.id.toString() }
            renderItem={({ item }) => (
              <Pressable
              
                style={styles.card}
              >
                <Text>{item.instrument}, {new Date(item.start_time).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                <Text>{PracticeDuration(item.duration)} </Text>
              </Pressable>
            )}
          />


            <Footer activePage={activePage} setActivePage={setActivePage} />

        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    list: {
    //flex: 1,
    paddingTop: 50,
    paddingLeft: 20, 
    paddingRight: 20,
    //paddingBottom: 80,
  },
    card: {
      backgroundColor: 'white',
      padding: 16,
      marginBottom: 12,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3, // shadow on Android
    },
    button: {
      backgroundColor: theme.colors.primary[500],  
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',          // shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3,                 // shadow for Android
      marginBottom: 100,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
})
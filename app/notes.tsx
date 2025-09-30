import { supabase } from '@/lib/supabaseClient';
import { getCurrentUserId } from "@/services/supabaseHelpers";
import { Stack } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ScrollView, Button, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Footer from '../components/Footer';
import { theme } from "../theme/theme";
import { getUserNotes, addNote, editNote, deleteNote } from '../services/notesService'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface Note {
  id: number;
  notes: string;
  date: string;
  user_id: string;
}

export default function Notes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [activePage, setActivePage] = useState("notes")
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  
  useEffect(() => {
    async function loadNotes() {
      const userNotes = await getUserNotes();
      setNotes(userNotes ?? []);
    }
    loadNotes();
  }, [notes]);


  async function handleEdit(note: Note) {
    setEditingNoteId(note.id)
    setText(note.notes)
    setModalVisible(true);
  }


  // Function to perform actions when the save button is clicked
  async function handleSave(note: string) {
    if (editingNoteId) {
      editNote(editingNoteId, note)
    }
    else {
      await addNote(note);
    }

    setModalVisible(false);
    setEditingNoteId(null);
    setText("");
  }


  const renderRightActions = (note: Note) => {
    return (
      <View style={styles.deleteContainer}>
        <Pressable style={styles.deleteButton} onPress={() => deleteNote(note)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView>
        <FlatList 
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 100,
          }}
          ListFooterComponent={
            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add Notes</Text>
          </Pressable>
          }
          style={styles.list}
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <Pressable 
                onPress={() => handleEdit(item)}
                style={styles.card}
              >
                <Text>
                  {new Date(item.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </Text>
              <Text>{item.notes}</Text>
              </Pressable>
            </Swipeable>
          )}
        />
        </GestureHandlerRootView>

      <Modal visible={modalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding": "height"}>

            <ScrollView 
            contentContainerStyle={{ flexGrow: 1}}
            keyboardDismissMode='on-drag'>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="arrow-back-ios-new" size={20}/>
              </Pressable>
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Type your practice notes..."
              multiline
              autoFocus
              value={text}
              onChangeText={setText}
              //onSubmitEditing={() => handleSave(text)}
            />
            <Button title="Save" onPress={() => handleSave(text)}/>
              </ScrollView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>

      <Footer activePage={activePage} setActivePage={setActivePage}/>
    </View>
  );  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background[100],
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background[100],
    paddingTop: 50,
    paddingRight: 20,
    paddingLeft: 20, 
    paddingBottom: 20,

  },
  textInput: {
    textAlignVertical: 'top',
    fontSize: 18,
    //borderWidth: 1,
    //borderColor: '#ccc',
    //borderRadius: 8,
    padding: 10,
    //height: 500,
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
    list: {
      //flex: 1,
      paddingTop: 50,
      paddingLeft: 20, 
      paddingRight: 20,
      //paddingBottom: 80,
    },
  noteItem: {
    marginBottom: 12, 
    padding: 12, 
    backgroundColor: "#f0f0f0", 
    borderRadius: 8 
  },
  date: { 
    fontSize: 12, 
    color: "#666", 
    marginBottom: 4 
  },
  content: { 
    fontSize: 16, 
    color: "#000" 
  },
  button: {
    backgroundColor: theme.colors.primary[500],  // default blue
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
  deleteContainer: {
    justifyContent: "center",
    marginBottom: 12, // same as card’s marginBottom
    borderRadius: 12, // match card radius
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 25,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  backButton: {
    fontSize: 16,
    color: "blue",
  },
});



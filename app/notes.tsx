import { supabase } from '@/lib/supabaseClient';
import { Stack } from "expo-router";
import { getCurrentUserId } from "@/lib/supabaseHelpers";
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from "../theme/theme";

interface Note {
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


  // Function to add a user's note to the database
  async function addNote(note: string) {
      const user_id = await getCurrentUserId();
      if (!user_id) return;

      const { data, error } = await supabase
        .from("practice_notes")
        .insert([{ notes: note, date: new Date(), user_id }])
        .select(); 

      if (error) console.error("Error adding note:", error.message);
      else console.log("Inserted note:", data); 
    }

  // Function to retrieve the current users notes from the database
  async function getUserNotes() {
    const user_id = await getCurrentUserId();
    if (!user_id) return [];

    const { data, error } = await supabase
      .from("practice_notes")
      .select("*")
      .eq("user_id", user_id) // only rows matching current user
      .order("date", { ascending: false }); // newest first

    if (error) console.error("Error fetching notes:", error.message);
    else return data;
  }

  // Function to edit a note
  async function editNote(noteId: number, updatedText: string) {
    const user_id = await getCurrentUserId();
    if (!user_id) return [];

    const { data, error } = await supabase
      .from("practice_notes")
      .update({ notes: updatedText, date: new Date() })
      .eq("id", noteId)
      .select();

      if (error) {
        console.error("Error updating note: ", error.message);
        return null;
      }

      return data ? data[0] : null;
  }

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

  async function handleDelete(note: Note) {
    const user_id = await getCurrentUserId();
    if (!user_id) return [];

    const { data, error } = await supabase
      .from("practice_notes")
      .delete()
      .eq("id", note.id);

      console.log("Data here: ", data)
      if (error) {
        console.error("Error deleting note: ", error.message);
        return null;
      }
      else {
        console.log("Note successfully deleted")
      }

    
  }

  const renderRightActions = (note: Note) => {
    return (
      <View style={styles.deleteContainer}>
        <Pressable style={styles.deleteButton} onPress={() => handleDelete(note)}>
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
            <TextInput
              style={styles.textInput}
              placeholder="Type your practice notes..."
              multiline
              autoFocus
              value={text}
              onChangeText={setText}
              //onSubmitEditing={() => handleSave(text)}
            />
            <Pressable onPress={Keyboard.dismiss}>
              <Text>Done</Text>
            </Pressable>
            <Button title="Save" onPress={() => handleSave(text)}/>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 50,
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
      paddingTop: 20,
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
});



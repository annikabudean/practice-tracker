import { supabase } from '@/lib/supabaseClient';
import { getCurrentUserId } from "@/lib/supabaseHelpers";
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, TextInput, View, Text, Pressable } from 'react-native';
import Footer from '../components/Footer';

interface Note {
  id: string;
  notes: string;
  date: string;
  user_id: string;
}

export default function Notes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [activePage, setActivePage] = useState("notes")
  const [notes, setNotes] = useState<Note[]>([]);

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

  

  // Function to perform actions when the save button is clicked
  async function handleSave(note: string) {
    setModalVisible(false);
    const session = await supabase.auth.getSession();
    console.log("Session:", session);
    await addNote(note);
    setText("");
  }


  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable 
              onPress={() => editNote(item)}
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
          )}
        />
      </View>
      <Button title="Add Notes" onPress={() => setModalVisible(true)}/>


      <Modal visible={modalVisible}>
        <View style={styles.modalContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your practice notes..."
              multiline
              autoFocus
              value={text}
              onChangeText={setText}
            />
            <Button title="Save" onPress={() => handleSave(text)}/>
        </View>
      </Modal>

      <Footer activePage={activePage} setActivePage={setActivePage}/>
    </View>
  );  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
    card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3, // shadow on Android
  },
  noteItem: { marginBottom: 12, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8 },
  date: { fontSize: 12, color: "#666", marginBottom: 4 },
  content: { fontSize: 16, color: "#000" },
})


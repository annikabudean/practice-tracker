import { supabase } from "../lib/supabaseClient";  
import { getCurrentUserId } from "./supabaseHelpers";
import { Note } from '../app/notes'
  


  // Function to add a user's note to the database
export async function addNote(note: string) {
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
export async function getUserNotes() {
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
export async function editNote(noteId: number, updatedText: string) {
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


// Function to delete a note
export async function deleteNote(note: Note) {
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


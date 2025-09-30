import { supabase } from "../lib/supabaseClient";  
import { getCurrentUserId } from "./supabaseHelpers";
  
  
// Function to retrieve the current users notes from the database
export async function getPracticeSessions() {
    const user_id = await getCurrentUserId();
    if (!user_id) return [];

    const { data, error } = await supabase
        .from("practice_sessions")
        .select("*")
        .eq("user_id", user_id) // only rows matching current user
        .order("created_at", { ascending: false }); // newest first
        
    if (error) console.error("Error fetching notes:", error.message);
    else return data;
}
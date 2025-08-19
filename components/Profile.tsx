import { supabase } from '@/lib/supabaseClient';
import { Ionicons } from '@expo/vector-icons'; // Expo includes Ionicons by default
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function Profile() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const {error} = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out: ", error.message);
      } else {
        console.log("Signed off successfully.")
      }
    }
    catch (error) {
        console.error('An unexpected error occurred during sign out:', error);
    }
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="person-circle-outline" size={40} color="#333" />
      </TouchableOpacity>
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menu}>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.menuItem}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    padding: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16,
  },
  menu: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
});
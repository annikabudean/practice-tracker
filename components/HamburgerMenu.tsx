import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {!isOpen && (
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Ionicons name="menu" size={32} color="black" />
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeButton}>
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>

            <View style={styles.links}>
              <Link onPress={() => setIsOpen(false)} href="/home" style={styles.linkText}>Home</Link>
              <Link onPress={() => setIsOpen(false)} href="/log" style={styles.linkText}>Log</Link>
              <Link onPress={() => setIsOpen(false)} href="/history" style={styles.linkText}>History</Link>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  menu: {
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    width: 250,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  links: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
});
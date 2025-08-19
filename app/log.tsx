import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HamburgerMenu from '../components/HamburgerMenu';
import Card from '../components/Card';
import Profile from '../components/Profile';
import { supabase } from '@/lib/supabaseClient';


export default function Log() {
    const [practiceLogs, setPracticeLogs] = useState([
    {
      id: '1',
      date: '2025-07-23',
      duration: 45,
      notes: 'Focused on double stops.',
    },
    {
      id: '2',
      date: '2025-07-22',
      duration: 30,
      notes: 'Warm-up and shifting',
    },
  ]);

    async function addPracticeLog(data) {
      const { data: insertedData, error } = await supabase
        .from('practice_sessions')
        .insert([data]);
        
    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.details}>🕒 {item.duration} mins</Text>
      <Text style={styles.details}>📝 {item.notes}</Text>
      <View style={styles.actions}>
        <TouchableOpacity><Text>Edit ✏️</Text></TouchableOpacity>
        <TouchableOpacity><Text>Delete 🗑️</Text></TouchableOpacity>
      </View>
    </View>
    )

    return (
        <View style={styles.container}>
      <Text style={styles.header}>Your Practice Log</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Pressed!')}>
            <Text style={styles.buttonText}>Add Practice Log</Text>
            <Icon name="add-circle-outline" size={24} color="#fff" style={styles.icon} />
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={practiceLogs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
    )
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, backgroundColor: '#fff', flex: 1 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  list: { 
    marginTop: 40
  },
  card: { 
    backgroundColor: '#f8f8f8', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15 
  },
  date: { 
    fontWeight: '600', 
    marginBottom: 5 
  },
  details: { 
    fontSize: 14, 
    marginTop: 4 
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 8,
    width: 200,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  icon: {
    marginLeft: 10,
  }
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HamburgerMenu from '../components/HamburgerMenu';
import Card from '../components/Card';
import Profile from '../components/Profile';
import Footer from '../components/Footer';



export default function Home() {
  const [activePage, setActivePage] = useState("home")
  
  return (

    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.topBar}>
        <HamburgerMenu />
        <Profile />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>PracticePath</Text>
        <Text style={styles.subtitle}>Welcome back, -Name-!</Text>
      </View>

      <View style={styles.cards}>
        <Card title="Goals" description="These are your goals" />
        <Card title="Practice Log" description="Log today's practice." />
        <Card title="Progress" description="See how you're doing this week" />
        <Card title="Streak" description="You have a -- day streak!" />
      </View>

      </ScrollView>

      <View>
        <Footer activePage={activePage} setActivePage={setActivePage}/>
      </View>



    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   scrollContent: {
    padding: 20,
    paddingBottom: 80, // give space so footer doesn't cover content
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    display: 'flex',
    marginBottom: 30,
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  cards: {
    marginBottom: 50,
  },
  profile: {
    marginBottom: 20,
  },
});
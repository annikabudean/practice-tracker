// import { Session } from '@supabase/supabase-js';
// import { Stack, useRouter, useSegments } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, Button, TextInput, View, Text } from 'react-native';
// import { supabase } from '../lib/supabaseClient';

// app/_layout.tsx
import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Stack, useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js'

export default function Layout() {
  /*
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) router.replace('/login'); // redirect if not logged in
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.replace('/login');
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
    */

  return <Stack screenOptions={{ headerShown: false, animation: 'none' }} />;
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

















/*
export default function Layout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  // Load initial session
  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session error:', error);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    init();

    // Auth change listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Handle redirect after session is loaded
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)'; // e.g. /login, /register
    if (!session && !inAuthGroup) {
      router.replace('/login'); // Not logged in → login page

    } else if (session && inAuthGroup) {
      router.replace('/home'); // Logged in → app
    }
  }, [session, loading, segments]);

  if (loading) return <Text>Loading...</Text>;

  return <Stack 
    screenOptions={{
      animation: 'none'
    }}
  />;
}
  */
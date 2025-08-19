import { Session } from '@supabase/supabase-js';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, TextInput, View, Text } from 'react-native';
import { supabase } from '../lib/supabaseClient';

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

  return <Stack />;
}
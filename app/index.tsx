import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Login from './login'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'expo-router';

export default function Index() {
  const [session, setSession] = useState<Session | null>(null)

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) router.replace('/home')
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) router.replace('/home')
    })
  }, [])
  return (
      <Login />
  )
}
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../lib/supabaseClient'
import { Button, Input } from 'react-native-elements'
import { useRouter } from 'expo-router';
;

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    console.log("where am i")
    if (error) {
      console.error("Login failed:", error.message);
      window.alert(error.message)

    }
    console.log("where am i in error")
    setLoading(false)
    router.replace('/home');
  }

  async function signUpWithEmail() {
  if (!email || !email.includes('@')) {
    window.alert('Please enter a valid email');
    return;
  }
  if (!password || password.length < 6) {
    window.alert('Password must be at least 6 characters');
    return;
  }

  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });

  setLoading(false);

  if (error) {
    console.error('SignUp error:', error);
    window.alert(error.message);
    return;
  }

  if (!data.session) {
    Alert.alert('Please check your email for confirmation');
  } else {
    router.replace('/home');
  }
}

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
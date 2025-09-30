import React, { useState } from 'react'
import { Image, Pressable, Text, Alert, StyleSheet, View, Button, TextInput } from 'react-native'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'expo-router';
import { theme } from "../theme/theme";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)

    if (error) {
      Alert.alert(error.message)
    } else {
      // Redirect to homepage after successful login
      router.replace('/home') 
    }
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      
      // options: {
      //   data: {
      //     first_name: first_name,
      //     last_name: last_name,
      //   }
      // }
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>

      

      <View style={styles.topText}>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <Text style={{color: 'gray', fontSize: 18}}>Please enter your details.</Text>
      </View>

      <View style={[styles.textInputs,]}>
        <TextInput
          style={[styles.loginBoxes, styles.topLoginBox]}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor='gray'
          autoCapitalize={'none'}
        />

        <TextInput
          style={styles.loginBoxes}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter your password"
          placeholderTextColor='gray'
          autoCapitalize={'none'}
        />

        <Pressable style={styles.loginButton} disabled={loading} onPress={() => signInWithEmail()}>
            <Text>Sign In</Text>
        </Pressable>
      </View>
     
     
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: theme.colors.background[100],
  },
  violinPicture: {
    alignItems: 'center',
    paddingTop: 50
  },
  topText: {
    flexDirection: 'column', 
    alignItems: 'center',
  },
  textInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 30,
   
  },
  welcome: {
    paddingTop: 80,
    fontSize: 50,
    textAlign: 'center',
  },
  topLoginBox: {
    marginTop: 30,
  },
  loginBoxes: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingLeft: 5,
    marginBottom: 20,
  },
  loginButton: {
    width: '80%',
    backgroundColor: theme.colors.primary[500],  // default blue
    paddingVertical: 10,  
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',          // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,                 // shadow for Android
    marginBottom: 100,
  }
})


/*<View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>/ */

/* 
<View>
      <Text>Login to your account.</Text>
      </View>
    <View style={[styles.textEntryBoxes]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          placeholderTextColor='gray'
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.textEntryBoxes]}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor='gray'
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>*/


      /*<View style={styles.violinPicture}>
        <Image 
        style={{width: 400, height: 300}}
        source={require('../assets/images/violin-picture.jpg')}/>
      </View> */

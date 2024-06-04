import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import config from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignupScreen({ navigation }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignup = async () => {
    if (phone.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long, contain one uppercase letter, one special character, and one digit.');
      return;
    }

    try {
      const response = await fetch(`${config.ipAddress}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, age, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigation.navigate('Login');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground source={require('../assets/bgg.jpg')} style={styles.background}>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{t('Create Account')}</Text>
        <Text style={styles.label}>{t('Full Name')}</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>{t('Email')}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.label}>{t('Phone')}</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>{t('Age')}</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Text style={styles.label}>{t('Password')}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>{t('Sign Up')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>{t('Already have an account? Sign In')}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

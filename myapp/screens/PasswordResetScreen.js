import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import config from '../config';

export default function PasswordResetScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleRequestOtp = async () => {
    try {
      const response = await fetch(`${config.ipAddress}/api/users/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();  // Read the response body as text
        throw new Error(`Request OTP failed: ${errorText}`);
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${config.ipAddress}/api/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();  // Read the response body as text
        throw new Error(`Reset password failed: ${errorText}`);
      }

      const data = await response.json();
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.label}>{t('email')}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder={t('enterEmail')}
          keyboardType="email-address"
        />
        <Button title={t('requestOtp')} onPress={handleRequestOtp} color="#4CAF50" />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.label}>{t('otp')}</Text>
        <TextInput
          value={otp}
          onChangeText={setOtp}
          style={styles.input}
          placeholder={t('enterOtp')}
          keyboardType="numeric"
        />
        <Text style={styles.label}>{t('newPassword')}</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
          placeholder={t('enterNewPassword')}
        />
        <Button title={t('resetPassword')} onPress={handleResetPassword} color="#4CAF50" />
      </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

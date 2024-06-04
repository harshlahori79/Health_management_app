import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.ipAddress}/api/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Error: {error}</Text>
        </View>
      </ImageBackground>
    );
  }

  if (!userDetails) {
    return (
      <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>No user data found</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Name: {userDetails.name}</Text>
        <Text style={styles.text}>Email: {userDetails.email}</Text>
        <Text style={styles.text}>Phone: {userDetails.phone}</Text>
        <Text style={styles.text}>Age: {userDetails.age}</Text>
        
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#76c7c0',
  },
});

export default ProfileScreen;

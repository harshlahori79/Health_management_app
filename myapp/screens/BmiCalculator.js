import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backgroundImage from '../assets/black.jpg'; 
import logo from '../assets/logo.png';
import config from '../config';
import Mytab from '../components/Mytab';
import { useTranslation } from 'react-i18next';

const calculateBMI = (height, weight ,) => {
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);
  return bmi.toFixed(1);
};

const getHealthLevel = (bmi) => {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

const BmiCalculator = ({navigation}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [healthLevel, setHealthLevel] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const { t } = useTranslation();

  const handleCalculateBMI = async () => {
    if (!height || !weight) {
      Alert.alert('Error', 'Please enter both height and weight');
      return;
    }
    const calculatedBMI = calculateBMI(height, weight);
    setBMI(calculatedBMI);
    const level = getHealthLevel(calculatedBMI);
    setHealthLevel(level);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${config.ipAddress}/api/bmi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ bmi: calculatedBMI, healthLevel: level }),
      });

      if (!response.ok) {
        throw new Error('Failed to save BMI data');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save BMI data');
    }
  };

  const openThirdPartyWebsite = () => {
    const url = 'https://www.bodbot.com/Workout_Generator.html';
    Linking.openURL(url);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* <Image source={logo} style={styles.logo} /> */}
        {!showWebView ? (
          <View style={styles.content}>
            <Text style={styles.title}>{t(BMIcalculator)}</Text>
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <Button title={t('CalculateBMI')} onPress={handleCalculateBMI} />
            {bmi && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{t('YourBMI')}: {bmi}</Text>
                <Text style={styles.resultText}>{t('healthLevel')}: {healthLevel}</Text>
              </View>
            )}
          </View>
        ) : null}
      </View>
      <Mytab navigation={navigation}/>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
  },
});

export default BmiCalculator;

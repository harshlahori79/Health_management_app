import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import PasswordResetScreen from './PasswordResetScreen';
import config from '../config';
import Bottomtab from '../components/Bottomtab';
import Mytab from '../components/Mytab';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const [steps, setSteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [kilometersTraveled, setKilometersTraveled] = useState(0);
  const [floorsClimbed, setFloorsClimbed] = useState(40.8);
  const [exerciseCalories, setExerciseCalories] = useState(75);
  const [heartRate, setHeartRate] = useState(75);

  useEffect(() => {
    const fetchContinuousStepData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.ipAddress}/api/continuous-steps/data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch step data');
        }

        const data = await response.json();
        setSteps(data.steps);
        setCaloriesBurned(data.caloriesBurned);
        setKilometersTraveled(data.kilometersTraveled);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContinuousStepData(); // Fetch once on mount

    const interval = setInterval(() => {
      fetchContinuousStepData();
    }, 60000); // Fetch data every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const HandleResetPassword = () => {
    navigation.navigate(PasswordResetScreen);
  };

  const handleStep = () => {
    navigation.navigate('StepCounter');
  };

  const handleBMI = () => {
    navigation.navigate('BMIcalculator');
  };

  return (
    <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>{t('Health')}</Text>
            <Progress.Circle
              size={100}
              indeterminate={false}
              progress={steps / 5000}
              thickness={7}
              color="#76c7c0"
              unfilledColor="#e0e0e0"
              borderWidth={0}
            />
            <View style={styles.stepsContainer}>
              <Text style={styles.stepsText}>{steps}/5000 {t('steps')}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{kilometersTraveled.toFixed(3)} {t('km')}</Text>
              </View>
              <View style={{marginHorizontal:15}}>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{caloriesBurned} {t('kcal')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.recordsContainer}>
            <TouchableOpacity style={styles.record} onPress={handleStep}>
              <Text style={styles.recordTitle}>{t('stepCounter')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.record} onPress={handleBMI}>
              <Text style={styles.recordTitle}>{t('BMI')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('stepHistory')}>
              <Text style={styles.buttonText}>{t('StepCountHistory')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('bmiHistory')}>
              <Text style={styles.buttonText}>{t('BMIHistory')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Mytab navigation={navigation} />
      </SafeAreaView>
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
    // backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    backgroundColor: '#76c7c0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  stepsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  recordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  record: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#76c7c0',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: '#76c7c0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

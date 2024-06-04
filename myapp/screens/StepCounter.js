import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import config from '../config';
import Mytab from '../components/Mytab';

export default function StepCounter({ navigation }) {
  const { t } = useTranslation();
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [kilometersTraveled, setKilometersTraveled] = useState(0);

  useEffect(() => {
    const loadSteps = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const storedData = JSON.parse(await AsyncStorage.getItem('stepData')) || [];
      const todayData = storedData.find(data => data.date === today);

      if (todayData) {
        setSteps(todayData.steps);
        setCaloriesBurned(todayData.caloriesBurned);
        setKilometersTraveled(todayData.kilometersTraveled);
      }
    };

    loadSteps();
  }, []);

  useEffect(() => {
    let subscription;
    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener((accelerometerData) => {
          const { y } = accelerometerData;
          const threshold = 0.1;
          const timestamp = new Date().getTime();

          if (
            Math.abs(y - lastY) > threshold &&
            !isCounting &&
            (timestamp - lastTimestamp > 800)
          ) {
            setIsCounting(true);
            setLastY(y);
            setLastTimestamp(timestamp);

            setSteps((prevSteps) => {
              const newSteps = prevSteps + 1;
              setCaloriesBurned(newSteps * 0.04);
              setKilometersTraveled(newSteps * 0.0008); // Assuming average step length of 0.8 meters
              saveSteps(newSteps, newSteps * 0.04, newSteps * 0.0008);
              return newSteps;
            });

            setTimeout(() => {
              setIsCounting(false);
            }, 1200);
          }
        });
      } else {
        console.log("Accelerometer not available on your device");
      }
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isCounting, lastY, lastTimestamp]);

  const saveSteps = async (steps, caloriesBurned, kilometersTraveled) => {
    const today = new Date().toISOString().slice(0, 10);
    const stepData = { steps, caloriesBurned, kilometersTraveled, date: today };

    // Save locally
    const storedData = JSON.parse(await AsyncStorage.getItem('stepData')) || [];
    const newData = storedData.filter(data => data.date !== today);
    newData.push(stepData);
    await AsyncStorage.setItem('stepData', JSON.stringify(newData));
  };

  useEffect(() => {
    const saveContinuousData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.ipAddress}/api/continuous-steps`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            steps,
            caloriesBurned,
            kilometersTraveled,
          }),
        });
  
        if (!response.ok) {
          console.error('Error saving continuous step data');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const interval = setInterval(() => {
      saveContinuousData();
    }, 10000); // Save data every 10 seconds
  
    return () => clearInterval(interval);
  }, [steps, caloriesBurned, kilometersTraveled]);

  useEffect(() => {
    const saveToBackend = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const storedData = JSON.parse(await AsyncStorage.getItem('stepData')) || [];
      const todayData = storedData.find(data => data.date === today);

      if (todayData) {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await fetch(`${config.ipAddress}/api/steps`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(todayData),
          });

          if (!response.ok) {
            console.error('Error saving step data');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 23 && now.getMinutes() === 59) {
        saveToBackend();
        setSteps(0);
        setCaloriesBurned(0);
        setKilometersTraveled(0);
        AsyncStorage.removeItem('stepData');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [steps, caloriesBurned, kilometersTraveled]);

  const data = steps / 5000;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
        <Text style={styles.title}>{t('stepTrackerTitle')}</Text>
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={200}
            progress={data}
            showsText
            formatText={() => `${steps}`}
            textStyle={styles.progressText}
            thickness={10}
            color="#76c7c0"
            unfilledColor="#e0e0e0"
            borderWidth={0}
          />
          <Text style={styles.goalText}>{t('Goal')} 5000</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{caloriesBurned.toFixed(2)} {t('caloriesBurned')}</Text>
         
        </View>
        <View style={styles.statsContainer}>
        <Text style={styles.statsText}>{kilometersTraveled.toFixed(2)} {t('kmTraveled')}</Text>
          
         
        </View>
        <View style={styles.statsContainer}>
        
          <Text style={styles.statsText}>{steps} {t('steps')}</Text>
         
        </View>
        <View style={styles.tabContainer}>
          <Mytab navigation={navigation} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60, // Added space for bottom tab
  },
  title: {
    fontSize: 28,
    marginTop: 40,
    fontWeight: 'bold',
    color: "#333",
  },
  progressContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 18,
    color: '#76c7c0',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent background
    borderRadius: 10,
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#333",
  },
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

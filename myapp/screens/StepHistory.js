import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
import { useTranslation } from 'react-i18next';

const StepListScreen = ({ navigation }) => {
  const [stepList, setStepList] = useState([]);
  const {t}=useTranslation();

  useEffect(() => {
    const fetchStepList = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.ipAddress}/api/steps/history`, {
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
        setStepList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStepList();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{t('CalculatedAt')}: {new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.itemText}>{t('steps')}: {item.steps}</Text>
      <Text style={styles.itemText}>{t('caloriesBurned')}: {item.caloriesBurned}</Text>
      <Text style={styles.itemText}>{t('kmTraveledCount')}: {item.kilometersTraveled.toFixed(3)}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={stepList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
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
    padding: 10,
   
  },
  item: {
    backgroundColor: '#76c7c0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
});

export default StepListScreen;

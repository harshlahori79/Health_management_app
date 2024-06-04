import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
import { useTranslation } from 'react-i18next';

const BmiListScreen = ({ navigation }) => {
  const [bmiList, setBmiList] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchBmiList = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.ipAddress}/api/bmi/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch BMI data');
        }

        const data = await response.json();
        setBmiList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBmiList();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{t('CalculatedAt')}: {new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.itemText}>{t('BMI')}: {item.bmi}</Text>
      <Text style={styles.itemText}>{t('healthLevel')}: {item.healthLevel}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={bmiList}
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
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

export default BmiListScreen;

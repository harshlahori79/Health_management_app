import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mytab = ({navigation}) => {
  const handleSetting = () => {
    navigation.navigate('Settings');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        <View style={styles.iconContainer}>
          <AntDesign name="home" size={24} color="black" onPress={() => navigation.navigate('Home')} style={styles.icon} />
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name="setting" size={24} color="black" onPress={handleSetting} style={styles.icon} />
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name="logout" size={24} color="black" onPress={handleLogout} style={styles.icon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightgray',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
});

export default Mytab;

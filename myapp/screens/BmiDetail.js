// screens/BmiDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BmiDetailScreen = ({ route }) => {
  const { bmiId } = route.params;

  // Fetch BMI details based on bmiId and set state

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BMI Detail Screen</Text>
      <Text>BMI ID: {bmiId}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default BmiDetailScreen;

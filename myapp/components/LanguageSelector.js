import React from 'react';
import { Button, View, Text, StyleSheet,ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('pleaseSelectLanguage')}</Text>
      <View style={styles.buttonContainer}>
        <Button title="English" onPress={() => changeLanguage('en')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="हिंदी" onPress={() => changeLanguage('hi')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="ਪੰਜਾਬੀ" onPress={() => changeLanguage('pa')} />
      </View>
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
    // backgroundColor: '#f8f9fa',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#fff'
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default LanguageSwitcher;

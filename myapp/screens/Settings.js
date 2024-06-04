import React from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSelector';
import Mytab from '../components/Mytab';

const Setting = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <ImageBackground source={require('../assets/black.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title={t('viewProfile')}
            onPress={() => navigation.navigate('Profilescreen')}
            color="#76c7c0"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={t('changePassword')}
            onPress={() => navigation.navigate('PasswordResetScreen')}
            color="#76c7c0"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={t('changeLanguage')}
            onPress={() => navigation.navigate('LanguageSelector')}
            color="#76c7c0"
          />
        </View>
        
      </View>
      <Mytab navigation={navigation} />
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
    paddingHorizontal: 20,
    
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default Setting;

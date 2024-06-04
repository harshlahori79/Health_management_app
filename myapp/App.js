import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import './i18n';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import PasswordResetScreen from './screens/PasswordResetScreen.js';
import ChangePasswordScreen from './screens/ChangePasswordScreen.js';
import StepCounter from './screens/StepCounter.js';
import BmiCalculator from './screens/BmiCalculator.js';
import { StepProvider } from './components/StepContext.js';
import Bottomtab from './components/Bottomtab.js';
import Mytab from './components/Mytab.js';
import Settings from './screens/Settings.js';
import ProfileScreen from './screens/Profilescreen.js';
import LanguageSwitcher from './components/LanguageSelector.js';
import BmiListScreen from './screens/BmiHistory.js';
import StepListScreen from './screens/StepHistory.js';


const Stack = createStackNavigator();

export default function App() {
  const { t } = useTranslation();

  return (
    <StepProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: t('login') }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: t('signup') }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: t('welcome') }} />
        <Stack.Screen name="StepCounter" component={StepCounter} options={{ title: t('stepcounter') }} />
        <Stack.Screen name="BMIcalculator" component={BmiCalculator} options={{ title: t('BMIcalculator') }} />
        <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ title: t('resetPassword') }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: t('resetPassword') }} />
        <Stack.Screen name="Mytab" component={Mytab} options={{ title: t('mytab') }} />
        <Stack.Screen name="Settings" component={Settings} options={{ title: t('settings') }} />
        <Stack.Screen name="Profilescreen" component={ProfileScreen} options={{ title: t('profilescreen') }} />
        <Stack.Screen name="LanguageSelector" component={LanguageSwitcher} options={{ title: t('languageselector') }} />
        <Stack.Screen name="bmiHistory" component={BmiListScreen} options={{ title: t('bmihistory') }} />
        <Stack.Screen name="stepHistory" component={StepListScreen} options={{ title: t('stephistory') }} />

      </Stack.Navigator>
    </NavigationContainer>
    
    </StepProvider>
  );
}

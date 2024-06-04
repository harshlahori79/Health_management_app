import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: 'Login',
      signup: 'Sign Up',
      SignIn: 'Sign In',
      welcome: 'Welcome',
      resetPassword: 'Reset Password',
      steps: 'Steps',
      changeLanguage: 'Change Language',
      logout: 'Logout',
      stepCounter: 'Step Counter',
      statistics: 'Statistics',
      stepTracker: 'Step Tracker',
      caloriesBurned: 'Calories Burned',
      kmTraveled: 'Km Traveled',
      stepTrackerTitle: 'Step Tracker',
      stepsCount: 'Steps',
      caloriesBurnedCount: 'Calories Burned',
      kmTraveledCount: 'Km Traveled',
      BMIcalculator: 'BMI CALCULATOR',
      CalculateBMI: 'Calculate BMI',
      YourBMI: 'Your BMI',
      BMI: 'BMI',
      email: 'Email',
      requestOtp: 'Request OTP',
      otp: 'OTP',
      newPassword: 'New Password',
      currentPassword: 'Current Password',
      resetPassword: 'Reset Password',
      viewProfile: 'View Profile',
      changePassword: 'Change Password',
      calculatedAt: 'Calculated At',
      healthLevel: 'Health Level',
      caloriesBurned: 'Calories Burned',
      kilometersTraveled: 'Kilometers Traveled',
      stepsCount: 'Steps Count',
      pleaseSelectLanguage: 'Please Select Your Preferred Language',
      Password: 'Password',
      "Don't have an account? Sign Up": "Don't have an account? Sign Up",
      steps: 'Steps',
      km: 'Km',
      kcal: 'Kcal',
      StepCountHistory: 'Step Count History',
      BMIHistory: 'BMI History',
      Goal: 'Goal',
      CalculatedAt: 'Calculated At',
      Donthaveanaccount:'Do not have an account?Sign Up',
    },
  },
  hi: {
    translation: {
      login: 'लॉगिन',
      signup: 'साइन अप करें',
      SignIn: 'साइन इन',
      welcome: 'स्वागत है',
      resetPassword: 'पासवर्ड रीसेट',
      steps: 'कदम',
      changeLanguage: 'भाषा बदलें',
      logout: 'लॉग आउट',
      stepCounter: 'कदम काउंटर',
      statistics: 'आंकड़े',
      stepTracker: 'कदम ट्रैकर',
      caloriesBurned: 'कैलोरी बर्न',
      kmTraveled: 'किलोमीटर यात्रा की',
      stepTrackerTitle: 'कदम ट्रैकर',
      stepsCount: 'कदम',
      caloriesBurnedCount: 'कैलोरी बर्न',
      kmTraveledCount: 'किलोमीटर यात्रा की',
      BMIcalculator: 'बीएमआई कैलकुलेटर',
      CalculateBMI: 'बीएमआई की गणना करें',
      BMI: 'बीएमआई',
      YourBMI: 'आपका बीएमआई',
      Healthlevel: 'स्वास्थ्य स्तर',
      email: 'ईमेल',
      requestOtp: 'ओटीपी प्राप्त करें',
      otp: 'ओटीपी',
      newPassword: 'नया पासवर्ड',
      currentPassword: 'वर्तमान पासवर्ड',
      resetPassword: 'पासवर्ड रीसेट',
      viewProfile: 'प्रोफाइल देखें',
      changePassword: 'पासवर्ड बदलें',
      calculatedAt: 'गणना की गई समय',
      healthLevel: 'स्वास्थ्य स्तर',
      caloriesBurned: 'कैलोरी बर्न',
      kilometersTraveled: 'किलोमीटर यात्रा की',
      stepsCount: 'कदम गणना',
      pleaseSelectLanguage: 'कृपया अपनी पसंदीदा भाषा चुनें',
      Password: 'पासवर्ड',
      "Don't have an account? Sign Up": "खाता नहीं है? साइन अप करें",
      steps: 'कदम',
      km: 'किमी',
      kcal: 'किलो कैलोरी',
      StepCountHistory: 'कदम गणना इतिहास',
      BMIHistory: 'बीएमआई इतिहास',
      Goal: 'लक्ष्य',
      CalculatedAt: 'गणना की गई समय',
    },
  },
  pa: {
    translation: {
      login: 'ਲੌਗਇਨ',
      signup: 'ਸਾਈਨ ਅੱਪ ਕਰੋ',
      SignIn: 'ਸਾਈਨ - ਇਨ',
      welcome: 'ਸਵਾਗਤ ਹੈ',
      resetPassword: 'ਪਾਸਵਰਡ ਰੀਸੈੱਟ',
      steps: 'ਕਦਮ',
      changeLanguage: 'ਭਾਸ਼ਾ ਬਦਲੋ',
      logout: 'ਲੌਗ ਆਉਟ',
      stepCounter: 'ਕਦਮ ਕਾਉਂਟਰ',
      statistics: 'ਅੰਕੜੇ',
      stepTracker: 'ਕਦਮ ਟਰੈਕਰ',
      caloriesBurned: 'ਕੈਲੋਰੀ ਬਰਨ',
      kmTraveled: 'ਕਿਲੋਮੀਟਰ ਤਿਆਰ ਕੀਤਾ',
      stepTrackerTitle: 'ਕਦਮ ਟਰੈਕਰ',
      stepsCount: 'ਕਦਮ',
      caloriesBurnedCount: 'ਕੈਲੋਰੀ ਬਰਨ',
      kmTraveledCount: 'ਕਿਲੋਮੀਟਰ ਤਿਆਰ ਕੀਤਾ',
      BMIcalculator: 'ਬੀਐਮਆਈ ਕੈਲਕੁਲੇਟਰ',
      CalculateBMI: 'ਬੀਐਮਆਈ ਦੀ ਗਣਨਾ ਕਰੋ',
      BMI: 'ਬੀਐਮਆਈ',
      YourBMI: 'ਤੁਹਾਡਾ BMI',
      Healthlevel: 'ਸਿਹਤ ਦਾ ਪੱਧਰ',
      email: 'ਈਮੇਲ',
      requestOtp: 'ਓਟੀਪੀ ਮੰਗੋ',
      otp: 'ਓਟੀਪੀ',
      newPassword: 'ਨਵਾਂ ਪਾਸਵਰਡ',
      currentPassword: 'ਮੌਜੂਦਾ ਪਾਸਵਰਡ',
      resetPassword: 'ਪਾਸਵਰਡ ਰੀਸੈੱਟ ਕਰੋ',
      viewProfile: 'ਪ੍ਰੋਫਾਈਲ ਵੇਖੋ',
      changePassword: 'ਪਾਸਵਰਡ ਬਦਲੋ',
      calculatedAt: 'ਗਣਨਾ ਕੀਤਾ ਗਿਆ',
      healthLevel: 'ਸਿਹਤ ਦਾ ਸਤਰ',
      caloriesBurned: 'ਕੈਲੋਰੀ ਬਰਨ',
      kilometersTraveled: 'ਕਿਲੋਮੀਟਰ ਤਿਆਰ ਕੀਤਾ',
      stepsCount: 'ਕਦਮ ਗਿਣਤੀ',
      pleaseSelectLanguage: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਮਨਪਸੰਦ ਭਾਸ਼ਾ ਚੁਣੋ',
      Password: 'ਪਾਸਵਰਡ',
      "Don't have an account? Sign Up": "ਖਾਤਾ ਨਹੀਂ ਹੈ? ਸਾਈਨ ਅਪ ਕਰੋ",
      steps: 'ਕਦਮ',
      km: 'ਕਿਮੀ',
      kcal: 'ਕੈਲੋਰੀ',
      StepCountHistory: 'ਕਦਮ ਗਿਣਤੀ ਇਤਿਹਾਸ',
      BMIHistory: 'ਬੀਐਮਆਈ ਇਤਿਹਾਸ',
      Goal: 'ਲੱਖ',
      CalculatedAt: 'ਗਣਨਾ ਕੀਤਾ ਗਿਆ',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

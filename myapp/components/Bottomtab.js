import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';

const Tab = createBottomTabNavigator();


const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

const Bottomtab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Settings" component={''} /> */}
      <Tab.Screen name="Reset Password" component={PasswordResetScreen} />
    </Tab.Navigator>
  );
}

export default Bottomtab;
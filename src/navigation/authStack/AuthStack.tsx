import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/authScreens/SplashScreen';
import GoalCategory from '../../screens/authScreens/GoalCategory';
import Onboarding from '../../screens/authScreens/Onboarding';
import LoginScreen from '../../screens/authScreens/LoginScreen';
import MainStack from '../mainStack/MainStack';

export type AuthStackParamList = {
  Splash: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  GoalCategory: undefined;
  Onboarding: undefined;
  Login: undefined;
  MainStack: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="GoalCategory" component={GoalCategory} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;

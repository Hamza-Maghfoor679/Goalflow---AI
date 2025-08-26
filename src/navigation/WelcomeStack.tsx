import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeLoadingScreen from '../screens/mainScreens/WelcomeScreen';

type WelcomeStackParamList = {
  Welcome: { message: string; progress?: number };
};

const Stack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Welcome" component={WelcomeLoadingScreen} />
      
    </Stack.Navigator>
  );
};

export default WelcomeStack;
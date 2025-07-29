import React, { useEffect } from 'react';
import AuthStack from './src/navigation/authStack/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const App = () => {
  useEffect(()=>{
    console.log('Hello')
  },[])
  return (
    <NavigationContainer>
      <AuthStack />
      <Toast />

    </NavigationContainer>
  );
};

export default App;

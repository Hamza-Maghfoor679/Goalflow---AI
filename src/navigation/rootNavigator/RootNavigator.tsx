import React from 'react';
import { useSelector } from 'react-redux';
import SplashScreen from '../../screens/authScreens/SplashScreen';
import { RootState } from '../../redux/store/store';
import AuthStack from '../authStack/AuthStack';
import MainStack from '../mainStack/MainStack';

const RootNavigator = () => {
  const idToken = useSelector((state: RootState) => state.auth.idToken);
  
  const isLoading = false;

  if (isLoading) {
    return <SplashScreen />;
  }

  return idToken ? <MainStack /> : <AuthStack />;
};

export default RootNavigator;

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginStyles } from '../../components/styles/loginStyles';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setIdToken, setLoginSuccess, setUserData } from '../../redux/slices/tokenSlice';

export default function LoginScreen({personality, trauma, preferences}: any) {

  console.log('CHECK THESE VALUES', personality, trauma, preferences);
  


  const navigation = useTypedNavigation();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();
      console.log('sigingResult', signInResult);
      dispatch(setLoginSuccess(true));
      const userData = signInResult?.data
      dispatch(setUserData(userData))
      
      let idToken = signInResult.data?.idToken ?? null
      
      dispatch(setIdToken(idToken));

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = GoogleAuthProvider.credential(
        signInResult?.data?.idToken,
      );

      const result = await signInWithCredential(getAuth(), googleCredential);
      
      return result;
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleAppleLogin = () => {
    console.log('Login with Apple');
    Toast.show({
      type: 'info',
      text1: 'Apple auth using firebase will be added',
    });
    navigation.navigate('MainStack');
  };

  const handleFacebookLogin = () => {
    Toast.show({
      type: 'info',
      text1: 'Facebook auth using firebase will be added',
    });
    navigation.navigate('MainStack');
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <Text style={loginStyles.title}>Welcome</Text>
      <Text style={loginStyles.subtitle}>Login to continue</Text>

      <View style={loginStyles.buttonContainer}>
        <Pressable style={loginStyles.button} onPress={handleGoogleLogin}>
          <Ionicons
            name="logo-google"
            size={20}
            color="white"
            style={loginStyles.icon}
          />
          <Text style={loginStyles.buttonText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={loginStyles.button} onPress={handleFacebookLogin}>
          <Ionicons
            name="logo-facebook"
            size={20}
            color="white"
            style={loginStyles.icon}
          />
          <Text style={loginStyles.buttonText}>Continue with Facebook</Text>
        </Pressable>

        <Pressable style={loginStyles.button} onPress={handleAppleLogin}>
          <Ionicons
            name="logo-apple"
            size={22}
            color="white"
            style={loginStyles.icon}
          />
          <Text style={loginStyles.buttonText}>Continue with Apple</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
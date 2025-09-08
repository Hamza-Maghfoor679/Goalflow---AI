import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginStyles } from '../../components/styles/loginStyles';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { signInWithGoogleAndInitializeData } from '../../utils/googleLogin';
import LoadingModal from '../../components/ui/LoadingModal';

export default function LoginScreen() {
  const onboardingPayload = useRoute().params;
  const navigation = useTypedNavigation();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoadingText('Initializing...');
    
    try {
      await signInWithGoogleAndInitializeData(
        onboardingPayload, 
        dispatch, 
        navigation,
        setLoadingText
      );
    } catch (error) {
      console.error('Login flow error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Please try again',
      });
    } finally {
      setIsLoading(false);
      setLoadingText('');
    }
  };
  
  const handleAppleLogin = () => {
    if (isLoading) return;
    
    console.log('Login with Apple');
    Toast.show({
      type: 'info',
      text1: 'Apple auth using firebase will be added',
    });
  };

  const handleFacebookLogin = () => {
    if (isLoading) return;
    
    Toast.show({
      type: 'info',
      text1: 'Facebook auth using firebase will be added',
    });
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <Text style={loginStyles.title}>Welcome</Text>
      <Text style={loginStyles.subtitle}>Login to continue</Text>

      <View style={loginStyles.buttonContainer}>
        <Pressable
          style={[loginStyles.button, isLoading && { opacity: 0.7 }]}
          onPress={handleGoogleLogin}
          disabled={isLoading}
        >
          <Ionicons
            name="logo-google"
            size={20}
            color="white"
            style={loginStyles.icon}
          />
          <Text style={loginStyles.buttonText}>Continue with Google</Text>
        </Pressable>

        <Pressable 
          style={[loginStyles.button, isLoading && { opacity: 0.7 }]} 
          onPress={handleFacebookLogin}
          disabled={isLoading}
        >
          <Ionicons
            name="logo-facebook"
            size={20}
            color="white"
            style={loginStyles.icon}
          />
          <Text style={loginStyles.buttonText}>Continue with Facebook</Text>
        </Pressable>

        <Pressable 
          style={[loginStyles.button, isLoading && { opacity: 0.7 }]} 
          onPress={handleAppleLogin}
          disabled={isLoading}
        >
          <Ionicons
            name="logo-apple"
            size={22}
            color="white"
            style={loginStyles.icon}
          />
          <Text style={loginStyles.buttonText}>Continue with Apple</Text>
        </Pressable>
      </View>

      <LoadingModal
        visible={isLoading}
        loadingText={loadingText}
        text2={
          loadingText.includes('tasks') 
            ? 'This may take a while...' 
            : 'Setting up your personalized experience...'
        }
      />
    </SafeAreaView>
  );
}
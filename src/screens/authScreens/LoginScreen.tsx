import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginStyles } from '../../components/styles/loginStyles';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { useRoute } from '@react-navigation/native';
import { signInWithGoogleAndSaveOnboarding } from '../../utils/googleLogin';

export default function LoginScreen() {
  const onboardingPayload = useRoute().params;

  const navigation = useTypedNavigation();
  const dispatch = useDispatch();
  
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
        <Pressable
          style={loginStyles.button}
          onPress={() => signInWithGoogleAndSaveOnboarding(onboardingPayload, dispatch)}
        >
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

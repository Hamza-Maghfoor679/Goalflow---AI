import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import {
  setIdToken,
  setLoginSuccess,
  setUid,
  setUserData,
} from '../redux/slices/tokenSlice';

export async function signInWithGoogleAndSaveOnboarding(
  onboardingPayload: any,
  dispatch?: any,
  navigation?: any,
) {
  try {
    const userInfo = await GoogleSignin.signIn();
    const googleEmail = userInfo?.data?.user?.email;

    if (!googleEmail) {
      Toast.show({ type: 'error', text1: 'Google email not found' });
      return;
    }

    const querySnapshot = await firestore()
      .collection('users')
      .where('google.email', '==', googleEmail)
      .limit(1)
      .get();

    const userExists = !querySnapshot.empty;

    if (!userExists && !onboardingPayload) {
      Toast.show({
        type: 'error',
        text1: 'Please complete onboarding to continue',
      });
      navigation?.navigate('Onboarding');
      return;
    }

    const { idToken } = await GoogleSignin.getTokens();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const signInResult = await auth().signInWithCredential(googleCredential);

    const finalUser: FirebaseAuthTypes.User | null = signInResult.user;

    const user = auth().currentUser;
    const uid = user?.uid;

    console.log('Firebase UID:', uid);

    if (!finalUser) throw new Error('User object missing after sign-in');

    dispatch?.(setIdToken(idToken));
    dispatch?.(setLoginSuccess(true));
    dispatch?.(setUserData(userInfo.data));
    dispatch?.(setUid(uid))

    const userRef = firestore().collection('users').doc(finalUser.uid);

    if (!userExists && onboardingPayload) {
      await userRef.set(
        {
          ...onboardingPayload,
          google: {
            displayName: finalUser.displayName,
            email: finalUser.email,
            photoURL: finalUser.photoURL,
          },
          linkedWithGoogle: true,
        },
        { merge: true },
      );

      Toast.show({
        type: 'success',
        text1: 'Account created successfully!',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
      });
    }
  } catch (err: any) {
    console.error('Google sign-in error:', err);
    Toast.show({
      type: 'error',
      text1: 'Google Sign-In Failed',
      text2: err?.message || 'Unexpected error',
    });
  }
}

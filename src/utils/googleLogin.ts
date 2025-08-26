import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

import {
  setFirebaseToken,
  setIdToken,
  setLoginSuccess,
  setUid,
  setUserData,
} from '../redux/slices/tokenSlice';
import { api } from '../api/api';

export async function signInWithGoogleAndSaveOnboarding(
  onboardingPayload: any,
  dispatch?: any,
  navigation?: any,
) {
  try {
    console.log('Starting Google Sign-In...', onboardingPayload);
    const payload = onboardingPayload?.onboardingPayload;

    // 1. Google Sign-in
    const userInfo = await GoogleSignin.signIn();
    const googleEmail = userInfo?.data?.user?.email;

    if (!googleEmail) {
      Toast.show({ type: 'error', text1: 'Google email not found' });
      return;
    }

    // 2. Check if user exists in Firestore
    const querySnapshot = await firestore()
      .collection('users')
      .where('google.email', '==', googleEmail)
      .limit(1)
      .get();

    const userExists = !querySnapshot.empty;

    if (!userExists && !payload) {
      Toast.show({
        type: 'error',
        text1: 'Please complete onboarding to continue',
      });
      navigation?.navigate('Onboarding');
      return;
    }

    // 3. Sign in to Firebase with Google credential
    const { idToken: googleIdToken } = await GoogleSignin.getTokens();
    const googleCredential = auth.GoogleAuthProvider.credential(googleIdToken);
    const signInResult = await auth().signInWithCredential(googleCredential);
    const finalUser: FirebaseAuthTypes.User | null = signInResult.user;

    const user = auth().currentUser;
    const uid = user?.uid;

    if (!finalUser) throw new Error('User object missing after sign-in');

    // ✅ 4. Get Firebase ID Token to use for backend authentication
    const firebaseIdToken: string | null =
      (await auth().currentUser?.getIdToken(true)) ?? null;
      dispatch(setFirebaseToken(firebaseIdToken))
    // ✅ Redux updates (send Firebase token to backend)
    dispatch?.(setIdToken(firebaseIdToken));
    dispatch?.(setLoginSuccess(true));
    dispatch?.(setUserData(userInfo.data));
    dispatch?.(setUid(uid));
    dispatch(api.util.resetApiState());

    const userRef = firestore().collection('users').doc(finalUser.uid);

    // 5. NEW USER → Save profile + onboarding data
    if (!userExists && onboardingPayload) {
      // Create user profile
      await userRef.set(
        {
          google: {
            displayName: finalUser.displayName,
            email: finalUser.email,
            photoURL: finalUser.photoURL,
          },
          linkedWithGoogle: true,
          goals: [],
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      // Create first goal
      const goalRef = firestore().collection('goals').doc();
      await goalRef.set({
        userId: finalUser.uid,
        category: payload.category,
        title: payload.input,
        timeframe: payload.timeFrame,
        answers: payload.answers || [],
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Save personality info
      const personalityRef = firestore().collection('personalities').doc();
      await personalityRef.set({
        userId: finalUser.uid,
        personality: payload.personality || '',
        preferences: payload.preferences || '',
        trauma: payload.trauma || '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Link goal and personality
      await userRef.update({
        goals: firestore.FieldValue.arrayUnion(goalRef.id),
        personality: firestore.FieldValue.arrayUnion(personalityRef.id),
      });

      Toast.show({
        type: 'success',
        text1: 'Account created 🎯 with your first goal',
      });
    } else {
      // 6. Existing user
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

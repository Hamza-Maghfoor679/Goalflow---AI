import { GoogleSignin, User as GoogleUser } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import axios, { AxiosResponse } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { NavigationProp } from '@react-navigation/native';

import {
  setFirebaseToken,
  setIdToken,
  setLoginSuccess,
  setUid,
  setUserData,
} from '../redux/slices/tokenSlice';
import { api, baseUrl } from '../api/api';

// Type definitions
interface OnboardingAnswers {
  [key: string]: string | number | boolean;
}

interface OnboardingPayload {
  category: string;
  input: string;
  timeFrame: string;
  personality?: string;
  preferences?: string;
  trauma?: string;
  answers?: OnboardingAnswers[];
}

interface OnboardingPayloadWrapper {
  onboardingPayload: OnboardingPayload;
}

interface UserData {
  google: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  };
  linkedWithGoogle: boolean;
  goals: string[];
  personality?: string[];
  createdAt: FirebaseFirestoreTypes.FieldValue;
}

interface GoalData {
  userId: string;
  category: string;
  title: string;
  timeframe: string;
  answers: OnboardingAnswers[];
  createdAt: FirebaseFirestoreTypes.FieldValue;
}

interface PersonalityData {
  userId: string;
  personality: string;
  preferences: string;
  trauma: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
}

interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

type SetLoadingTextFunction = (text: string) => void;

// Helper function to initialize all HomeScreen data
async function initializeHomeScreenData(
  uid: string, 
  goalId: string, 
  idToken: string, 
  setLoadingText?: SetLoadingTextFunction
): Promise<void> {
  try {
    const dataPromises: Promise<AxiosResponse<any> | null>[] = [];

    // Generate personality insights
    setLoadingText?.('Generating personality insights...');
    dataPromises.push(
      axios.post<ApiResponse>(
        `${baseUrl}personality/generate`, 
        { uid }, 
        {
          headers: { Authorization: `Bearer ${idToken}` },
          timeout: 30000,
        }
      ).catch((err: Error) => {
        console.warn('Personality generation failed:', err);
        return null;
      })
    );

    // Generate motivational quote
    setLoadingText?.('Creating your daily motivation...');
    dataPromises.push(
      axios.post<ApiResponse>(
        `${baseUrl}quotes/generate`, 
        { goalId }, 
        {
          headers: { Authorization: `Bearer ${idToken}` },
          timeout: 30000,
        }
      ).catch((err: Error) => {
        console.warn('Quote generation failed:', err);
        return null;
      })
    );

    // Get progress data
    setLoadingText?.('Calculating your progress...');
    dataPromises.push(
      axios.get<ApiResponse>(
        `${baseUrl}progress/${goalId}`, 
        {
          headers: { Authorization: `Bearer ${idToken}` },
          timeout: 30000,
        }
      ).catch((err: Error) => {
        console.warn('Progress fetch failed:', err);
        return null;
      })
    );

    // Wait for all basic data (non-blocking)
    await Promise.allSettled(dataPromises);

    // Generate AI tasks (this usually takes longer)
    setLoadingText?.('Planning your daily tasks with AI...');
    try {
      await axios.get<ApiResponse>(
        `${baseUrl}tasks/generate/goal/${goalId}?phase=1`, 
        {
          headers: { Authorization: `Bearer ${idToken}` },
          timeout: 90000,
        }
      );
      console.log('✅ AI tasks generated successfully');
    } catch (error) {
      console.warn('❌ AI tasks generation failed (non-critical):', error);
      // Continue even if AI tasks fail
    }

    console.log('✅ HomeScreen data initialization completed');
  } catch (error) {
    console.error('❌ Error initializing HomeScreen data:', error);
    // Don't throw - let user proceed even if some data fails
    // HomeScreen can handle missing data gracefully
  }
}

// Enhanced function that initializes all data before navigation
export async function signInWithGoogleAndInitializeData(
  onboardingPayload: OnboardingPayloadWrapper | null,
  dispatch: Dispatch,
  navigation?: NavigationProp<any>,
  setLoadingText?: SetLoadingTextFunction,
): Promise<void> {
  try {
    console.log('Starting Google Sign-In and data initialization...', onboardingPayload);
    const payload = onboardingPayload?.onboardingPayload;

    setLoadingText?.('Signing in with Google...');

    // 1. Google Sign-in
    const userInfo: GoogleUser = await GoogleSignin.signIn();
    
    // Debug: Log the complete response structure
    console.log('📧 Google Sign-In Response Structure:', JSON.stringify(userInfo, null, 2));
    
    // Try multiple possible paths for email with proper typing
    const googleEmail: string | undefined = 
      (userInfo as any)?.data?.user?.email || 
      userInfo?.user?.email || 
      (userInfo as any)?.email ||
      (userInfo as any)?.data?.email;

    // Debug: Log email extraction attempts
    console.log('📧 Email extraction attempts:', {
      'userInfo?.data?.user?.email': (userInfo as any)?.data?.user?.email,
      'userInfo?.user?.email': userInfo?.user?.email,
      'userInfo?.email': (userInfo as any)?.email,
      'userInfo?.data?.email': (userInfo as any)?.data?.email,
      'final_email': googleEmail
    });

    if (!googleEmail) {
      console.error('❌ No email found in any expected path');
      Toast.show({ 
        type: 'error', 
        text1: 'Google email not found',
        text2: 'Please try again or contact support'
      });
      return;
    }

    console.log('✅ Google email found:', googleEmail);

    // 2. Check if user exists in Firestore
    setLoadingText?.('Checking user profile...');
    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot = await firestore()
      .collection('users')
      .where('google.email', '==', googleEmail)
      .limit(1)
      .get();

    const userExists: boolean = !querySnapshot.empty;

    if (!userExists && !payload) {
      Toast.show({
        type: 'error',
        text1: 'Please complete onboarding to continue',
      });
      navigation?.navigate('Onboarding' as never);
      return;
    }

    // 3. Sign in to Firebase with Google credential
    setLoadingText?.('Authenticating with Firebase...');
    const { idToken: googleIdToken }: { idToken: string } = await GoogleSignin.getTokens();
    const googleCredential: FirebaseAuthTypes.AuthCredential = auth.GoogleAuthProvider.credential(googleIdToken);
    const signInResult: FirebaseAuthTypes.UserCredential = await auth().signInWithCredential(googleCredential);
    const finalUser: FirebaseAuthTypes.User = signInResult.user;

    const user: FirebaseAuthTypes.User | null = auth().currentUser;
    const uid: string | undefined = user?.uid;

    if (!finalUser || !uid) {
      throw new Error('User object missing after sign-in');
    }

    // 4. Get Firebase ID Token
    const firebaseIdToken: string = (await auth().currentUser?.getIdToken(true)) ?? '';
    
    // 5. Update Redux with auth data
    dispatch(setFirebaseToken(firebaseIdToken));
    dispatch(setIdToken(firebaseIdToken));
    dispatch(setLoginSuccess(true));
    // Use the correct user data structure
    dispatch(setUserData((userInfo as any).data || userInfo));
    dispatch(setUid(uid));
    dispatch(api.util.resetApiState());

    const userRef: FirebaseFirestoreTypes.DocumentReference = firestore().collection('users').doc(finalUser.uid);
    let goalId: string | null = null;

    if (!userExists && onboardingPayload && payload) {
      // NEW USER FLOW - Create all data
      setLoadingText?.('Setting up your profile...');
      
      // Create user profile
      const userData: UserData = {
        google: {
          displayName: finalUser.displayName,
          email: finalUser.email,
          photoURL: finalUser.photoURL,
        },
        linkedWithGoogle: true,
        goals: [],
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await userRef.set(userData, { merge: true });

      setLoadingText?.('Creating your first goal...');
      // Create first goal
      const goalRef: FirebaseFirestoreTypes.DocumentReference = firestore().collection('goals').doc();
      const goalData: GoalData = {
        userId: finalUser.uid,
        category: payload.category,
        title: payload.input,
        timeframe: payload.timeFrame,
        answers: payload.answers || [],
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await goalRef.set(goalData);

      setLoadingText?.('Saving your personality profile...');
      // Save personality info
      const personalityRef: FirebaseFirestoreTypes.DocumentReference = firestore().collection('personalities').doc();
      const personalityData: PersonalityData = {
        userId: finalUser.uid,
        personality: payload.personality || '',
        preferences: payload.preferences || '',
        trauma: payload.trauma || '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await personalityRef.set(personalityData);

      // Link goal and personality
      await userRef.update({
        goals: firestore.FieldValue.arrayUnion(goalRef.id),
        personality: firestore.FieldValue.arrayUnion(personalityRef.id),
      });

      goalId = goalRef.id;

      Toast.show({
        type: 'success',
        text1: 'Account created successfully! 🎯',
      });
    } else {
      // EXISTING USER FLOW
      setLoadingText?.('Loading your profile...');
      
      // Get user's goal ID from Firestore
      const userDoc: FirebaseFirestoreTypes.DocumentSnapshot = await userRef.get();
      const userData = userDoc.data() as UserData | undefined;
      goalId = userData?.goals?.[0] || null;

      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
      });
    }

    // 6. Navigate immediately - data is in store, HomeScreen can load data as needed
    setLoadingText?.('Almost ready...');
    navigation?.navigate('MainStack' as never);

    // 7. Initialize HomeScreen data in background (non-blocking)
    if (goalId && firebaseIdToken) {
      // Run data initialization in background without blocking navigation
      initializeHomeScreenData(finalUser.uid, goalId, firebaseIdToken, undefined)
        .catch(error => {
          console.warn('Background data initialization failed:', error);
          // HomeScreen can handle missing data gracefully
        });
    }

  } catch (err) {
    console.error('Google sign-in error:', err);
    const error = err as Error;
    Toast.show({
      type: 'error',
      text1: 'Sign-in Failed',
      text2: error?.message || 'Unexpected error',
    });
    setLoadingText?.('');
  }
}

// Legacy function for backwards compatibility
export async function signInWithGoogleAndSaveOnboarding(
  onboardingPayload: OnboardingPayloadWrapper | null,
  dispatch: Dispatch,
  navigation?: NavigationProp<any>,
): Promise<void> {
  return signInWithGoogleAndInitializeData(onboardingPayload, dispatch, navigation);
}
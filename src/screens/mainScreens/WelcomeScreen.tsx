import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
// import { clearFirstLogin } from '../../redux/slices/tokenSlice';
import { useHomeScreenApi } from '../../hooks/useHomeScreenApi';

// Type definitions
type WelcomeStackParamList = {
  Welcome: { message: string; progress?: number };
};

type WelcomeScreenRouteProp = RouteProp<WelcomeStackParamList, 'Welcome'>;

interface AuthState {
  userData: {
    user?: {
      givenName?: string;
    };
  } | null;
  Uid: string | null;
  idToken: string | null;
  isFirstLogin?: boolean;
}

const WelcomeLoadingScreen: React.FC = () => {
  const route = useRoute<WelcomeScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { Uid, isFirstLogin } = useSelector(
    (state: RootState) => state.auth,
  ) as AuthState;
  const { message = 'Loading your personalized experience', progress = 0 } =
    route.params || {};

  const [dots, setDots] = useState('');
  const [currentMessage, setCurrentMessage] = useState(message);
  const [currentProgress, setCurrentProgress] = useState(progress);

  // Use the same API hook to track loading state
  const {
    goalsData,
    personalityData,
    tasksData,
    goalProgressData,
    hasGoalId,
    isUserLoading,
    isGoalsLoading,
    isPersonalityLoading,
    isTasksLoading,
    isTasksGenerating,
    isProgressLoading,
  } = useHomeScreenApi(Uid, true);

  // Check if all data is loaded
  const isAllDataLoaded = React.useMemo(() => {
    return (
      !isUserLoading &&
      !isGoalsLoading &&
      !isPersonalityLoading &&
      !isTasksLoading &&
      !isTasksGenerating &&
      !isProgressLoading &&
      goalsData &&
      personalityData &&
      (hasGoalId ? tasksData && goalProgressData : true)
    );
  }, [
    isUserLoading,
    isGoalsLoading,
    isPersonalityLoading,
    isTasksLoading,
    isTasksGenerating,
    isProgressLoading,
    goalsData,
    personalityData,
    hasGoalId,
    tasksData,
    goalProgressData,
  ]);

  // Calculate progress based on loading states
  useEffect(() => {
    const loadingStates = [
      isUserLoading,
      isGoalsLoading,
      isPersonalityLoading,
      isTasksLoading || isTasksGenerating,
      isProgressLoading,
    ];

    const completedStates = loadingStates.filter(state => !state).length;
    const totalStates = loadingStates.length;
    const calculatedProgress = Math.min(completedStates / totalStates, 1);

    setCurrentProgress(calculatedProgress);
  }, [
    isUserLoading,
    isGoalsLoading,
    isPersonalityLoading,
    isTasksLoading,
    isTasksGenerating,
    isProgressLoading,
  ]);

  // Update message based on current loading state
  useEffect(() => {
    if (isUserLoading) {
      setCurrentMessage('Loading your profile');
    } else if (isGoalsLoading) {
      setCurrentMessage('Fetching your goals');
    } else if (isPersonalityLoading) {
      setCurrentMessage('Loading AI insights');
    } else if (isTasksLoading || isTasksGenerating) {
      setCurrentMessage('Generating your first phase');
    } else if (isProgressLoading) {
      setCurrentMessage('Calculating progress');
    } else if (isAllDataLoaded) {
      setCurrentMessage('All set! Redirecting');
    } else {
      setCurrentMessage('Setting up your experience');
    }
  }, [
    isUserLoading,
    isGoalsLoading,
    isPersonalityLoading,
    isTasksLoading,
    isTasksGenerating,
    isProgressLoading,
    isAllDataLoaded,
  ]);

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Navigate when all data is loaded
  useEffect(() => {
    if (isAllDataLoaded && isFirstLogin) {
      // Clear the first login flag
      // dispatch(clearFirstLogin());

      // Navigate to main app with a small delay to show completion
      setTimeout(() => {
        // navigation.navigate('MainStack');
      }, 1500);
    }
  }, [isAllDataLoaded, isFirstLogin, dispatch, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles" size={40} color="white" />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {isAllDataLoaded ? 'Welcome! ✨' : 'Generating first Phase! ✨'}
        </Text>

        {/* Dynamic Message */}
        <Text style={styles.message}>
          {currentMessage}
          {!isAllDataLoaded && dots}
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${currentProgress * 100}%` }]}
          />
        </View>

        {/* Progress Percentage */}
        <Text style={styles.progressText}>
          {Math.round(currentProgress * 100)}%
        </Text>

        {/* Spinner */}
        {!isAllDataLoaded && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.spinner}
          />
        )}

        {/* Success Icon */}
        {isAllDataLoaded && (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footerText}>
          {isAllDataLoaded
            ? 'Your personalized experience is ready!'
            : 'Setting up your personalized experience...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  } as ViewStyle,

  contentContainer: {
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  } as ViewStyle,

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  } as ViewStyle,

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1a1a1a',
    letterSpacing: 0.5,
  } as TextStyle,

  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 22,
    paddingHorizontal: 10,
    minHeight: 22, // Prevent layout shift when dots animate
  } as TextStyle,

  progressBarContainer: {
    width: 200,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  } as ViewStyle,

  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
    minWidth: 8,
    transition: 'width 0.3s ease',
  } as ViewStyle,

  progressText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 20,
  } as TextStyle,

  spinner: {
    marginBottom: 20,
  } as ViewStyle,

  successContainer: {
    marginBottom: 20,
  } as ViewStyle,

  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  } as TextStyle,
});

export default WelcomeLoadingScreen;

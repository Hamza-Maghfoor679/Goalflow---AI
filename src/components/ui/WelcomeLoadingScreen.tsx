// components/ui/loading/WelcomeLoadingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface WelcomeLoadingScreenProps {
  message: string;
  progress?: number;
}

const WelcomeLoadingScreen: React.FC<WelcomeLoadingScreenProps> = ({
  message,
  progress = 0,
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* AI Icon Container */}
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles" size={40} color="white" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Generating first Phase! ✨</Text>

        {/* Loading Message */}
        <Text style={styles.message}>
          {message}
          {dots}
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>

        {/* Activity Indicator */}
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={styles.spinner}
        />

        {/* Footer Text */}
        <Text style={styles.footerText}>
          Setting up your personalized experience...
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
    // iOS Shadow
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Android Shadow
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
  } as TextStyle,

  progressBarContainer: {
    width: 200,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  } as ViewStyle,

  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
    minWidth: 8, // Ensures some progress is always visible
  } as ViewStyle,

  spinner: {
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

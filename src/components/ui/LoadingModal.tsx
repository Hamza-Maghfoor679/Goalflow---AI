import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 👈 AI-style icon

interface LoadingModalProps {
  visible: boolean;
  loadingText: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, loadingText }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <StatusBar
        backgroundColor="rgba(0,0,0,0.4)"
        barStyle="light-content"
        translucent
      />

      <View style={styles.overlay}>
        <Animatable.View
          animation="fadeInUp"
          duration={700}
          style={styles.modal}
          useNativeDriver
        >
          {/* 👇 AI Icon with bounce animation */}
          <Animatable.View
            animation="bounceIn"
            iterationCount="infinite"
            duration={2000}
            style={styles.iconContainer}
            useNativeDriver
          >
            <Ionicons name="sparkles" size={20} color="#fff" />
          </Animatable.View>

          {/* Spinner */}
          {/* <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} /> */}

          {/* Loading Text */}
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            duration={1500}
            style={styles.text}
          >
            {loadingText}
          </Animatable.Text>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  modal: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  spinner: {
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
});

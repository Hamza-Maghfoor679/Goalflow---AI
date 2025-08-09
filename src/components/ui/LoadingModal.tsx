import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { Text } from 'react-native-animatable';

const LoadingModal = ({ visible, loadingText }: { visible: boolean, loadingText: string }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent // ✅ THIS LINE is the fix
    >
      {/* Optional: Hide the status bar if needed */}
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" translucent />

      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 10 }}>{loadingText}</Text>
        </View>
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
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
});

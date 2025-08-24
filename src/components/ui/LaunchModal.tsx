import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  Pressable,
} from 'react-native';

interface LaunchModalProps {
  visible: boolean;
  LaunchText: string;
  onClose: () => void;
  children?: ReactNode 
}

const LaunchModal: React.FC<LaunchModalProps> = ({
  visible,
  LaunchText,
  onClose,
  children
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar
        backgroundColor="rgba(0,0,0,0.5)"
        barStyle="light-content"
        translucent
      />

      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>{LaunchText}</Text>
          {children}

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default LaunchModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 10,
  },
  modal: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#555',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

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
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LaunchModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children?: ReactNode 
}

const ReusableModal: React.FC<LaunchModalProps> = ({
  visible,
  title,
  onClose,
  children
}) => {
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar
        backgroundColor="rgba(255, 255, 255, 1)"
        barStyle="light-content"
        translucent
      />

      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>{capitalizedTitle}</Text>
          {children}

          <Pressable onPress={onClose} style={styles.closeButton}>
           <Ionicons name="close-circle" size={28} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReusableModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 10,
  },
  modal: {
    backgroundColor: '#1e4759ff',
    padding: 30,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
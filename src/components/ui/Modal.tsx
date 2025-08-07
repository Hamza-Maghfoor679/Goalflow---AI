import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from './Button';

interface UserInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: { data: string }) => void;
  placeholder?: string;
  title?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  value?: string;
  setValue?: (value: string) => void;
}

const CustomModal: React.FC<UserInfoModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  placeholder = 'Enter your data',
  title,
  children,
  disabled = false,
  value,
  setValue
}) => {

// This is incorrect if you're using external `value` and `setValue`
const handleSubmit = () => {
  console.log('Submitting data:', value);
  if (value?.trim()) {
    onSubmit({ data: value.trim() });
    onClose();
  }
};
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          style={styles.flexOne}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.modalTitle}>{title}</Text>

                <TextInput
                  placeholder={placeholder}
                  placeholderTextColor="#999"
                  style={[styles.modalInput, styles.multilineInput]}
                  returnKeyType="done"
                  multiline
                  value={value}
                  onChangeText={setValue}
                  blurOnSubmit={true}
                  textAlignVertical="top"
                />
                { children }

                <View style={styles.buttonWrapper}>
                  <Button
                    title="Submit & Continue"
                    onPress={handleSubmit}
                    disabled={disabled}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    margin: 0,
    paddingHorizontal: 4,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 15,
    maxHeight: Dimensions.get('window').height * 0.8,
    width: '100%',
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  modalInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#000',
  },
  multilineInput: {
    height: 100,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

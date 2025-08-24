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
import { styles } from '../styles/ModalStyles';

interface UserInfoModalProps {
  isVisible: boolean;
  onClose?: () => void;
  onSubmit: (data: { data: string }) => void;
  placeholder?: string;
  title?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  loadingText?: string
  buttonText?: string
}

const CustomModal: React.FC<UserInfoModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  placeholder,
  title,
  children,
  disabled = false,
  value,
  setValue,
  loadingText,
  buttonText = 'Submit & Continue'
}) => {

const handleSubmit = () => {
  if (value?.trim()) {
    onSubmit({ data: value.trim() });
    // onClose();
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
                    title={disabled ? loadingText : buttonText}
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



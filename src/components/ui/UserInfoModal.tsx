import React from "react";
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";

interface UserInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    personality: string;
    trauma: string;
    preferences: string;
  }) => void;
  personality: string;
  trauma: string;
  preferences: string;
  setPersonality: (text: string) => void;
  setTrauma: (text: string) => void;
  setPreferences: (text: string) => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  personality,
  trauma,
  preferences,
  setPersonality,
  setTrauma,
  setPreferences,
}) => {

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      useNativeDriver
      avoidKeyboard={true}
      style={styles.modalContainer}
      onBackButtonPress={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          style={styles.flexOne}
        >
          <View style={styles.modalContent}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalTitle}>Tell us more about yourself so We can help you even more</Text>

              <TextInput
                placeholder="Personality type (e.g., Introvert, Ambivert)"
                placeholderTextColor="#999"
                style={styles.modalInput}
                value={personality}
                onChangeText={setPersonality}
                returnKeyType="done"
                blurOnSubmit={false}
              />

              <TextInput
                placeholder="Any past traumas you'd like to mention (optional)"
                placeholderTextColor="#999"
                style={[styles.modalInput, styles.multilineInput]}
                multiline
                textAlignVertical="top"
                value={trauma}
                onChangeText={setTrauma}
                returnKeyType="done"
                blurOnSubmit={true}
              />

              <TextInput
                placeholder="Any preferences we should know about?"
                placeholderTextColor="#999"
                style={[styles.modalInput, styles.multilineInput]}
                multiline
                textAlignVertical="top"
                value={preferences}
                onChangeText={setPreferences}
                returnKeyType="done"
                blurOnSubmit={true}
              />

              <View style={styles.buttonWrapper}>
                <Button
                  title="Submit & Continue"
                  onPress={() => onSubmit({ personality, trauma, preferences })}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UserInfoModal;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    justifyContent: "center",
    margin: 0, 
    paddingHorizontal: 4,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 15,
    maxHeight: Dimensions.get("window").height * 0.8,
    width: "100%",
    alignSelf: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  modalInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: "#000",
  },
  multilineInput: {
    height: 100,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

import { StyleSheet } from "react-native";

export const onboardingStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#393E46",
    },
    slide: {
      marginHorizontal: 16,
      backgroundColor: "#f5f5f5",
      borderRadius: 20,
      paddingTop: 44,
      paddingBottom: 24,
      justifyContent: "flex-start",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 4,
      paddingHorizontal: 20,
    },
    backButton: {
      position: "absolute",
      top: 5,
      left: 5,
      zIndex: 10,
      padding: 8,
    },
    question: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 20,
      color: "#000",
    },
    optionsWrapper: {
      width: "100%",
      alignItems: "center",
    },
    option: {
      width: "100%",
      backgroundColor: "#eee",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 12,
      alignItems: "center",
    },
    optionSelected: {
      backgroundColor: "#34699A",
    },
    optionText: {
      fontSize: 14,
      color: "#333",
      fontWeight: "500",
    },
    optionTextSelected: {
      color: "#fff",
    },
  });
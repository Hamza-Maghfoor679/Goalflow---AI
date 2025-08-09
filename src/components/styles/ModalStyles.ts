import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
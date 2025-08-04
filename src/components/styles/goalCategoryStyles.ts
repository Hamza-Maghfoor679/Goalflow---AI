import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#393E46',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 50,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
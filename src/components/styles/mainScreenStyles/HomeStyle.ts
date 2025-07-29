import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../assets/colors/colors";
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greetingsSection: {
    backgroundColor: colors.primary,
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 16,
    zIndex: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  scrollContent: {
    paddingTop: 15,
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 14,
    marginTop: 4,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  taskCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  taskCardDone: {
    backgroundColor: '#d4f5dd',
  },
  taskCardPending: {
    backgroundColor: '#eee',
  },
  taskText: {
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  progressCard: {
    backgroundColor: '#dceeff',
    padding: 16,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressSubText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  insightCard: {
    backgroundColor: '#f3e8ff',
    padding: 16,
    borderRadius: 12,
  },
  insightText: {
    fontSize: 15,
    lineHeight: 20,
  },
  goalCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    width: width * 0.6,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  progressPercent: {
    fontSize: 12,
    color: '#666',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
});
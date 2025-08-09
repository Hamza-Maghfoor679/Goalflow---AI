import { StyleSheet } from "react-native";
import { colors } from "../../../assets/colors/colors";

export 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: colors.primary },
  goalCard: {
    backgroundColor: '#e6f7ff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  goalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  goalDescription: { fontSize: 14, color: '#555' },
  progressBar: {
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  progress: {
    width: '18%', // Example: Week 2 of 12 = 16%
    height: '100%',
    backgroundColor: '#0077cc',
  },
  progressText: {
    fontSize: 12,
    marginTop: 6,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
    color: colors.primary
  },
  taskCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  completedTask: {
    backgroundColor: '#c6f6d5',
  },
  taskText: {
    fontSize: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
    color: colors.primary
  },
  tipText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
    marginTop: 4
  },
});


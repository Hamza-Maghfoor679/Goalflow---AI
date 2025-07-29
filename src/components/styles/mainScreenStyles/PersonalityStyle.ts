import { StyleSheet } from "react-native";
import { colors } from "../../../assets/colors/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  fixedHeader: {
    paddingHorizontal: 16,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: colors.primary
  },
  card: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  personalityType: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  personalityTitle: {
    fontSize: 16,
    color: '#d3dae4ff',
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  traitPill: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  traitText: {
    color: '#fff',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    color: colors.primary
  },
  paragraph: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    fontSize: 15,
    color: '#334155',
    marginVertical: 2,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});
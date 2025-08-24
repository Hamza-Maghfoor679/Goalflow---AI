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

  // Tab Navigation Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 4,
    marginTop: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  // Content Styles
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
    color: colors.primary,
  },
  paragraph: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    minHeight: 50,
  },
  listContainer: {
    marginTop: 8,
    backgroundColor: '#384e65ff',
  },
  listItem: {
    fontSize: 15,
    color: '#334155',
    marginVertical: 2,
  },

  // Strengths Section Styles
  strengthCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  strengthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  strengthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    marginLeft: 10,
  },
  strengthDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Challenges Section Styles
  challengeCard: {
    backgroundColor: '#fefce8',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 10,
    flex: 1,
  },
  solutionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // Motivation Tips Styles
  tipCard: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Chart Styles
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  traitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  traitName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    width: 120,
  },
  traitBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  traitBar: {
    height: '100%',
    borderRadius: 4,
  },
  traitScore: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    width: 35,
    textAlign: 'right',
  },

  // Additional Enhancement Styles
  insightCard: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
    fontWeight: '500',
  },

  // Goal Compatibility Styles
  compatibilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  compatibilityTag: {
    backgroundColor: '#ddd6fe',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  compatibilityText: {
    color: '#5b21b6',
    fontSize: 12,
    fontWeight: '500',
  },

  // Progress Indicator Styles
  progressContainer: {
    marginVertical: 15,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressLabelText: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressLabelValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  // Bottom Button
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },

  // Empty State Styles
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
  },

  // Loading State Styles
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 10,
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
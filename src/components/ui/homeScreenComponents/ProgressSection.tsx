import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../components/styles/mainScreenStyles/HomeStyle';

interface ProgressSectionProps {
  progressPercent: number;
  isLoading: boolean;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ 
  progressPercent, 
  isLoading 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📊 Your Progress</Text>
      <View style={styles.progressCard}>
        <Text style={styles.progressText}>Keep Going 🔥</Text>
        <Text style={styles.progressSubText}>
          {isLoading
            ? 'Loading progress...'
            : `You're ${progressPercent}% through your current goal.`}
        </Text>
      </View>
    </View>
  );
};

export default ProgressSection;
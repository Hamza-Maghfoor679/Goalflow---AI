import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { styles } from '../../../components/styles/mainScreenStyles/HomeStyle';

interface AIInsightSectionProps {
  aiInsight: string;
  isLoading: boolean;
}

const AIInsightSection: React.FC<AIInsightSectionProps> = ({ 
  aiInsight, 
  isLoading 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🧠 AI Insight</Text>
      <View style={styles.insightCard}>
        <Text style={styles.insightText}>
          {isLoading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width="100%"
                height={60}
                borderRadius={10}
              />
            </SkeletonPlaceholder>
          ) : (
            aiInsight
          )}
        </Text>
      </View>
    </View>
  );
};

export default AIInsightSection;
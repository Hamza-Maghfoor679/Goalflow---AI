import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { styles } from '../../../components/styles/mainScreenStyles/HomeStyle';

interface TodaysFocusProps {
  todayFocus: string | null | undefined;
  isLoading: boolean;
}

const TodaysFocus: React.FC<TodaysFocusProps> = ({ todayFocus, isLoading }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎯 Daily Reminder</Text>
      <View style={[styles.taskCard, styles.taskCardPending]}>
        <Text style={styles.taskText}>
          {isLoading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width="100%"
                height={60}
                borderRadius={10}
              />
            </SkeletonPlaceholder>
          ) : (
            todayFocus || 'Focus on your brain'
          )}
        </Text>
      </View>
    </View>
  );
};

export default TodaysFocus;
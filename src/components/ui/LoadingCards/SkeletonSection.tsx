// components/ui/skeleton/SkeletonSections.tsx
import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import SkeletonCard from './SkeletonCard';

const sectionTitleStyle: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333'
};

export const TodaysFocusSkeleton: React.FC = () => (
  <View>
    <Text style={sectionTitleStyle}>
      🎯 Today's Focus
    </Text>
    <SkeletonCard height={120} />
  </View>
);

export const ProgressSkeleton: React.FC = () => (
  <View>
    <Text style={sectionTitleStyle}>
      📊 Your Progress
    </Text>
    <SkeletonCard height={140} />
  </View>
);

export const AIInsightSkeleton: React.FC = () => (
  <View>
    <Text style={sectionTitleStyle}>
      🤖 AI Insights
    </Text>
    <SkeletonCard height={100} />
  </View>
);

export const TopGoalsSkeleton: React.FC = () => (
  <View>
    <Text style={sectionTitleStyle}>
      🎯 Your Top Goals
    </Text>
    <SkeletonCard height={160} />
  </View>
);
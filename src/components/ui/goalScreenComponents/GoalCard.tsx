import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../components/styles/mainScreenStyles/GoalsStyle';
import { getProgressColor } from '../../../utils/progress';

interface GoalCardProps {
  category: string;
  totalPhases: number;
  phase: number;
  progressPercent: number;
  completedTasks: number;
  totalTasks: number;
  startDate: string;
  endDate: string;
}

const GoalCard: React.FC<GoalCardProps> = ({
  category,
  totalPhases,
  phase,
  progressPercent,
  completedTasks,
  totalTasks,
  startDate,
  endDate,
}) => {
  return (
    <View style={styles.goalCard}>
      <Text style={styles.goalTitle}>Goal: {category}</Text>
      <Text style={styles.goalDescription}>
        Based on your time frame and personality: We have divided your Goal
        into {totalPhases} phases
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progress,
            {
              width: `${progressPercent}%`,
              backgroundColor: getProgressColor(progressPercent),
            },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        Phase {phase} of {totalPhases}
      </Text>
      <Text style={styles.progressText}>
        Tasks Completed {completedTasks} of {totalTasks}
      </Text>
      <View style={styles.dateContainer}>
        <Text style={styles.progressText}>Start Date {startDate}</Text>
        <Text style={styles.progressText}>End Date {endDate}</Text>
      </View>
    </View>
  );
};

export default GoalCard;
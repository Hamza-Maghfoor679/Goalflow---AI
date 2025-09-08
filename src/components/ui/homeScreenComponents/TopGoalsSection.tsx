import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../../components/styles/mainScreenStyles/HomeStyle';
import { getProgressColor } from '../../../utils/progress';
import CustomModal from '../Modal';
import LaunchModal from '../LaunchModal';
import ReusableModal from '../LoadingCards/ReusableModal';

interface Goal {
  id: React.Key | null | undefined;
  category: string;
  title: string;
  totalPhases?: number;
  totalTasks?: number;
  progressPercentage?: number;
  completedTasksCount?: number;
  currentPhase?: number;
}

interface TopGoalsSectionProps {
  topGoals: Goal[];
  progressPercent: number;
  isLoading: boolean;
}

const GoalCard: React.FC<{
  goal: Goal;
  progressPercent: number;
}> = ({ goal, progressPercent }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  console.log('Rendering GoalCard for goal:', goal);
  return (
    <TouchableOpacity
      style={[styles.goalCard, { marginRight: 16 }]}
      onPress={() => setIsVisible(true)}
    >
      <Text style={styles.goalTitle}>
        {goal.category
          ? goal.category.charAt(0).toUpperCase() + goal.category.slice(1)
          : 'No Category'}
      </Text>
      <Text style={styles.goalDesc}>
        {goal.title
          ? goal.title.charAt(0).toUpperCase() +
            goal.title.slice(1, 24) +
            (goal.title.length > 24 ? '...' : '')
          : 'No Title'}
      </Text>

      <View style={styles.progressBarBackground}>
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

      <Text style={styles.progressPercent}>
        {progressPercent}% complete
      </Text>
      <ReusableModal title={goal.category} visible={isVisible} onClose={() => setIsVisible(false)}>
        <Text style={{
          color: '#fff',
          fontSize: 15,
        }}>{goal.title}</Text>
        <Text style={{
          color: '#fff',
          fontSize: 15,
          marginTop: 10
        }}>Total Phases: {goal.totalPhases}</Text>
        <Text style={{
          color: '#fff',
          fontSize: 15,
          marginVertical: 5
        }}>Current Phase: {goal.currentPhase}</Text>
        <Text style={{
          color: '#fff',
          fontSize: 15,
          marginVertical: 5
        }}>Total Tasks: {goal.totalTasks}</Text>
        <Text style={{
          color: '#fff',
          fontSize: 15,
          marginVertical: 5
        }}>Tasks Completed: {goal.completedTasksCount}</Text>
      </ReusableModal>
    </TouchableOpacity>
  );
};

const TopGoalsSection: React.FC<TopGoalsSectionProps> = ({ 
  topGoals, 
  progressPercent, 
  isLoading 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🏆 Your Top Goals</Text>

      {isLoading || !topGoals.length ? (
        <Text style={{ paddingVertical: 10, color: '#888' }}>
          {isLoading
            ? 'Loading goals...'
            : 'No goals found. Add one to get started.'}
        </Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 10 }}
        >
          {topGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              progressPercent={progressPercent}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TopGoalsSection;
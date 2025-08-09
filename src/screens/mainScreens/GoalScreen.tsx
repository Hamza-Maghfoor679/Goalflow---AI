import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { initialTasks } from '../../constants/utils';
import { styles } from '../../components/styles/mainScreenStyles/GoalsStyle';
import { useSelector } from 'react-redux';
import { useGenerateTasksQuery } from '../../api/HomeApi';
import { RootState } from '../../redux/store/store';
import LoadingModal from '../../components/ui/LoadingModal';
import { useGetUserQuery } from '../../api/userApi';

const GoalsScreen: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const { Uid } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGenerateTasksQuery(Uid!);
  const { data: userData } = useGetUserQuery(Uid!);
  console.log('data: ', data.tasks);
  const rawCategory =
    userData?.firestoreData?.onboardingPayload?.category || 'general';
  const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
  useEffect(() => {
    if (data?.tasks) {
      const mappedTasks =
        data?.tasks?.map((task: { title: string }, index: number) => ({
          id: index.toString(),
          title: task.title,
          completed: false,
        })) ?? [];
      setTasks(mappedTasks);
    }
  }, [data?.tasks]);

  const { tipOfTheDay } = data || {};

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Your Smart Goal Plan</Text>
      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>Main Goal: {category}</Text>
        <Text style={styles.goalDescription}>
          Based on your inputs: You will be guided and the tasks will be
          generated!
        </Text>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.progressText}>Week 0 of 12</Text>
      </View>

      <Text style={styles.sectionTitle}>📅 Today's Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskCard, item.completed && styles.completedTask]}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={styles.taskText}>
              {item.completed ? '✅' : '⬜'} {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.tipTitle}>💡 AI Tip of the Day</Text>
      <Text style={styles.tipText}>
        {isLoading ? 'Loading tip...' : tipOfTheDay || 'No tip available.'}
      </Text>
      <LoadingModal
        visible={isLoading}
        loadingText={isLoading ? 'Analyzing Data...' : 'Retrieving Data...'}
      />
    </View>
  );
};
export default GoalsScreen;

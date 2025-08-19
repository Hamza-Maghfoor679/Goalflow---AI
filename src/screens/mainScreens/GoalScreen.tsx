import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialTasks } from '../../constants/utils';
import { styles } from '../../components/styles/mainScreenStyles/GoalsStyle';
import { useSelector } from 'react-redux';
import { useGenerateTasksQuery } from '../../api/HomeApi';
import { RootState } from '../../redux/store/store';
import LoadingModal from '../../components/ui/LoadingModal';
import { useGetUserQuery } from '../../api/userApi';
import { useGetTasksQuery } from '../../api/tasks';

const TIP_CACHE_KEY = 'tipOfTheDayCache';

const GoalsScreen: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [cachedTip, setCachedTip] = useState<string | null>(null);
  const [shouldFetchTip, setShouldFetchTip] = useState(true);

  const { Uid } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGenerateTasksQuery(Uid!, {
    skip: !shouldFetchTip,
  });
  const goalIds = useSelector((state: RootState) => state.goals.goalIds);
  const initialId = goalIds[0];
  // Get tasks for the initial Id
  const { data: tasksData } = useGetTasksQuery(initialId);

  const { data: userData } = useGetUserQuery(Uid!);
  const rawCategory =
    userData?.firestoreData?.onboardingPayload?.category || 'general';
  const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  useEffect(() => {
    if (tasksData?.todaysTasks) {
      const mappedTasks = tasksData.todaysTasks.map((task: any) => ({
        ...task,
        completed: false,
      }));
      setTasks(mappedTasks);
    }
  }, [tasksData]);

  // Check AsyncStorage cache for tip on mount
  useEffect(() => {
    const loadTipFromCache = async () => {
      try {
        const cached = await AsyncStorage.getItem(TIP_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          const age = Date.now() - parsed.timestamp;
          if (age < 86400000) {
            setCachedTip(parsed.tipOfTheDay);
            setShouldFetchTip(false); // Use cached tip, skip API
            return;
          }
        }
        setShouldFetchTip(true); // No valid cache, fetch new tip
      } catch (e) {
        console.error('Failed to load cached tip', e);
        setShouldFetchTip(true);
      }
    };
    loadTipFromCache();
  }, []);

  // Cache new tip when API data changes
  useEffect(() => {
    if (data?.tipOfTheDay && shouldFetchTip) {
      AsyncStorage.setItem(
        TIP_CACHE_KEY,
        JSON.stringify({
          tipOfTheDay: data.tipOfTheDay,
          timestamp: Date.now(),
        }),
      );
      setCachedTip(data.tipOfTheDay);
    }
  }, [data, shouldFetchTip]);

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
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskCard, item.completed && styles.completedTask]}
            onPress={() => toggleTask(item.id.toString())}
          >
            <Text style={styles.taskText}>
              {item.completed ? '✅' : '⬜'} {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.tipTitle}>💡 AI Tip of the Day</Text>
      <Text style={styles.tipText}>
        {isLoading && !cachedTip
          ? 'Loading tip...'
          : cachedTip || 'No tip available.'}
      </Text>

      <LoadingModal
        visible={isLoading && !cachedTip}
        loadingText={
          isLoading ? 'Analyzing Data...' : 'Retrieving Data...'
        }
      />
    </View>
  );
};

export default GoalsScreen;

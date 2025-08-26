import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../components/styles/mainScreenStyles/HomeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useGenerateTaskswithAiQuery } from '../../api/HomeApi';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';
import LaunchModal from '../../components/ui/LaunchModal';
import { useUserDetailsQuery } from '../../api/userApi';
import { useGetGoalsQuery } from '../../api/goals';
import { setGoal } from '../../redux/slices/goalsSlice';
import { useGetProgressQuery, useGetTasksQuery } from '../../api/tasks';
import ProgressSection from '../../components/ui/homeScreenComponents/ProgressSection';
import TodaysFocus from '../../components/ui/homeScreenComponents/TodaysFocus';
import AIInsightSection from '../../components/ui/homeScreenComponents/AIInsightSection';
import TopGoalsSection from '../../components/ui/homeScreenComponents/TopGoalsSection';
const HomeScreen = () => {
  const { userData, Uid, idToken } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();

  const [isInit, setIsInit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [todayFocus, setTodayFocus] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userName = userData?.user?.givenName ?? 'User';
  const isAuthReady = Boolean(Uid && idToken);

  // Initialize when auth is ready
  useEffect(() => {
    if (isAuthReady && !isInit) {
      const timer = setTimeout(() => setIsInit(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthReady, isInit]);

  // API queries
  const {
    data: userDetails,
    isLoading: userLoading,
    refetch: refetchUser,
    error: userError,
  } = useUserDetailsQuery(undefined, {
    skip: !isInit || !Uid,
    refetchOnMountOrArgChange: false,
  });

  const goalId = userDetails?.firestoreData?.goals?.[0] ?? null;
  const hasGoal = Boolean(goalId);

  const {
    data: progressData,
    isLoading: progressLoading,
    refetch: refetchProgress,
  } = useGetProgressQuery(
    { goalId },
    { skip: !hasGoal, refetchOnMountOrArgChange: false },
  );

  const {
    isLoading: tasksGenerating,
    refetch: refetchTaskGen,
    error: taskGenError,
  } = useGenerateTaskswithAiQuery(
    { goalId, phase: 1 },
    {
      skip: !hasGoal, // Force refetch when goalId changes
      refetchOnMountOrArgChange: false, 
    },
  );

  const {
    data: tasksData,
    isLoading: tasksLoading,
    refetch: refetchTasks,
    error: tasksError,
  } = useGetTasksQuery(
    { goalId, phase: 1, dayIndex: 0 },
    { skip: !hasGoal, refetchOnMountOrArgChange: false, },
  );

  console.log('📊 Task Generation Status:', {
    tasksGenerating,
    taskGenError: !!taskGenError,
    hasGoal,
    goalId,
  });

  const {
    data: personalityData,
    isLoading: personalityLoading,
    refetch: refetchPersonality,
    error: personalityError,
  } = useGeneratePersonalityQuery(Uid!, {
    skip: !isInit || !Uid,
    refetchOnMountOrArgChange: false,
  });

  const {
    data: goalsData,
    isLoading: goalsLoading,
    refetch: refetchGoals,
    error: goalsError,
  } = useGetGoalsQuery(undefined, { skip: !isInit || !Uid });

  // Combined data management
  useEffect(() => {
    if (tasksData?.tasks?.length > 0) {
      console.log(
        '📝 Setting today focus from tasks:',
        tasksData.tasks[0].title,
      );
      setTodayFocus(tasksData.tasks[0].title);
    }
    if (goalsData) {
      console.log('🎯 Dispatching goals to Redux:', goalsData.length);
      dispatch(setGoal(goalsData));
    }
  }, [tasksData, goalsData, dispatch]);

  // Sequential data fetch: First get user details, then goal-dependent data
  useEffect(() => {
    if (isInit && Uid && !userDetails && !userLoading && !userError) {
      console.log('👤 Fetching initial user data...');
      refetchUser();
    }
  }, [isInit, Uid, userDetails, userLoading, userError, refetchUser]);

  // Fetch goal-independent data when user details are available
  useEffect(() => {
    if (userDetails && !goalsData && !goalsLoading && !goalsError) {
      console.log('🎯 Fetching goals and personality data...');
      Promise.all([refetchGoals(), refetchPersonality()])
        .then(() => console.log('✅ Basic data fetch completed'))
        .catch(err => console.error('❌ Basic data fetch error:', err));
    }
  }, [
    userDetails,
    goalsData,
    goalsLoading,
    goalsError,
    refetchGoals,
    refetchPersonality,
  ]);

  // Fetch goal-dependent data when goal ID becomes available
  useEffect(() => {
    if (hasGoal && goalId) {
      console.log('🎯 Goal available, fetching goal-dependent data...', {
        goalId,
      });

      // First check if tasks exist, if not generate them
      if (!tasksData?.tasks?.length && !tasksLoading && !tasksGenerating) {
        console.log('🚀 Generating AI tasks...');
        refetchTaskGen()
          .then(() => {
            console.log('✅ AI task generation completed');
            // After task generation, fetch tasks and progress
            return Promise.all([refetchTasks(), refetchProgress()]);
          })
          .then(() => console.log('✅ Goal-dependent data fetch completed'))
          .catch(err =>
            console.error('❌ Goal-dependent data fetch error:', err),
          );
      } else if (tasksData?.tasks?.length > 0) {
        // Tasks exist, just fetch progress
        console.log('📊 Tasks exist, fetching progress...');
        refetchProgress();
      }
    }
  }, [
    hasGoal,
    goalId,
    tasksData,
    tasksLoading,
    tasksGenerating,
    refetchTaskGen,
    refetchTasks,
    refetchProgress,
  ]);

  // Error logging
  useEffect(() => {
    const errors = {
      userError,
      taskGenError,
      tasksError,
      personalityError,
      goalsError,
    };
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) console.error('API Errors:', errors);
  }, [userError, taskGenError, tasksError, personalityError, goalsError]);

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    if (!isInit || !Uid || isRefreshing) return;

    setIsRefreshing(true);
    try {
      const userResult = await refetchUser();
      const updatedGoalId = userResult?.data?.firestoreData?.goals?.[0];

      await Promise.all([refetchGoals(), refetchPersonality()]);

      if (updatedGoalId) {
        await Promise.all([
          refetchProgress(),
          refetchTasks(),
          refetchTaskGen(),
        ]);
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [
    isInit,
    Uid,
    isRefreshing,
    refetchUser,
    refetchGoals,
    refetchPersonality,
    refetchProgress,
    refetchTasks,
    refetchTaskGen,
  ]);

  // Derived data
  const aiInsight =
    personalityData?.data?.aiInsight ?? 'No AI insight available.';
  const progressPercent = progressData?.progressPercent ?? 0;
  const topGoals = useMemo(() => goalsData?.slice(0, 5) || [], [goalsData]);

  const isMainLoading = !isInit || userLoading || goalsLoading;

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        tintColor="#007AFF"
        colors={['#007AFF']}
        progressBackgroundColor="#ffffff"
        title="Pull to refresh..."
        titleColor="#666666"
      />
    ),
    [isRefreshing, onRefresh],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingsSection}>
        <Text style={styles.greeting}>Welcome, {userName} 👋</Text>
        <Text style={styles.subGreeting}>
          Here's what your AI planned for today
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}
      >
        <TodaysFocus
          todayFocus={todayFocus}
          isLoading={tasksLoading || tasksGenerating}
        />
        <ProgressSection
          progressPercent={progressPercent}
          isLoading={progressLoading}
        />
        <AIInsightSection
          aiInsight={aiInsight}
          isLoading={personalityLoading}
        />
        <TopGoalsSection
          topGoals={topGoals}
          progressPercent={progressPercent}
          isLoading={goalsLoading}
        />
        {isRefreshing && <View style={{ height: 20 }} />}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsVisible(true)}
      >
        <Ionicons name="sparkles-outline" size={24} color="white" />
        <Text style={styles.floatingButtonText}>Plan My Day with AI</Text>
      </TouchableOpacity>

      <LoadingModal
        visible={
          isMainLoading ||
          (personalityLoading && !isRefreshing) ||
          (tasksGenerating && !isRefreshing)
        }
        loadingText={
          !isInit || userLoading
            ? 'Initializing...'
            : personalityLoading
            ? 'Analyzing Personality...'
            : tasksGenerating
            ? 'Generating Goal Phase...'
            : tasksLoading
            ? 'Fetching Daily Tasks...'
            : 'Retriving Data...'
        }
      />

      <LaunchModal
        visible={isVisible}
        LaunchText="This feature is in beta mode and will be available soon..."
        onClose={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

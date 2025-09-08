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
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useGenerateQuotewithAiQuery } from '../../api/HomeApi';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';
import LaunchModal from '../../components/ui/LaunchModal';
import { useUserDetailsQuery } from '../../api/userApi';
import { useGetGoalsQuery } from '../../api/goals';
import { useGetProgressQuery } from '../../api/tasks';
import ProgressSection from '../../components/ui/homeScreenComponents/ProgressSection';
import TodaysFocus from '../../components/ui/homeScreenComponents/TodaysFocus';
import AIInsightSection from '../../components/ui/homeScreenComponents/AIInsightSection';
import TopGoalsSection from '../../components/ui/homeScreenComponents/TopGoalsSection';

// TypeScript interfaces
interface UserData {
  user?: {
    givenName?: string;
    email?: string;
  };
  firestoreData?: {
    goals?: string[];
  };
}

interface QuoteData {
  quote?: string;
  author?: string;
}

interface PersonalityData {
  data?: {
    aiInsight?: string;
  };
}

interface ProgressData {
  progressPercent?: number;
}

interface GoalData {
  id: string;
  title: string;
  category: string;
  timeframe: string;
}

const HomeScreen: React.FC = () => {
  const { userData, Uid, idToken } = useSelector(
    (state: RootState) => state.auth,
  );
  console.log(idToken);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const userName: string = (userData as UserData)?.user?.givenName ?? 'User';
  const isAuthReady: boolean = Boolean(Uid && idToken);

  // API queries - only run when necessary
  const {
    data: userDetails,
    isLoading: userLoading,
    refetch: refetchUser,
    error: userError,
  } = useUserDetailsQuery(undefined, {
    skip: !isAuthReady,
    refetchOnMountOrArgChange: false,
  });

  const goalId: string | null = userDetails?.firestoreData?.goals?.[0] ?? null;
  const hasGoal: boolean = Boolean(goalId);

  const {
    data: progressData,
    isLoading: progressLoading,
    refetch: refetchProgress,
  } = useGetProgressQuery(
    { goalId: goalId! },
    { skip: !hasGoal, refetchOnMountOrArgChange: false },
  );

  const {
    data: quotesData,
    isLoading: quotesGenerating,
    refetch: refetchQuotes,
  } = useGenerateQuotewithAiQuery(
    { goalId: goalId! },
    {
      skip: !hasGoal, // Fixed: removed the !quoteData condition
      refetchOnMountOrArgChange: false,
    },
  );

  const {
    data: personalityData,
    isLoading: personalityLoading,
    refetch: refetchPersonality,
  } = useGeneratePersonalityQuery(Uid!, {
    skip: !isAuthReady,
    refetchOnMountOrArgChange: false,
  });

  const {
    data: goalsData,
    isLoading: goalsLoading,
    refetch: refetchGoals,
    error: goalsError,
  } = useGetGoalsQuery(undefined, {
    skip: !isAuthReady,
    refetchOnMountOrArgChange: false,
  });

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    if (!isAuthReady || isRefreshing) return;

    setIsRefreshing(true);
    try {
      const userResult = await refetchUser();
      const updatedGoalId = userResult?.data?.firestoreData?.goals?.[0];

      await Promise.all([
        refetchGoals(),
        refetchPersonality(),
        refetchQuotes(),
      ]);

      if (updatedGoalId) {
        await refetchProgress();
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [
    isAuthReady,
    isRefreshing,
    refetchUser,
    refetchGoals,
    refetchPersonality,
    refetchProgress,
    refetchQuotes,
  ]);

  // Derived data with proper typing
  const aiInsight: string =
    (personalityData as PersonalityData)?.data?.aiInsight ??
    'Swipe down to refresh....';
  const progressPercent: number =
    (progressData as ProgressData)?.progressPercent ?? 0;
  const topGoals: GoalData[] = useMemo(
    () => (goalsData as GoalData[])?.slice(0, 5) || [],
    [goalsData],
  );

  // Fixed: Only show loading for critical missing data
  const isCriticalDataMissing: boolean =
    !isAuthReady || (userLoading && !goalId);
  const showLoadingModal: boolean = isCriticalDataMissing && !isRefreshing;

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
          todayFocus={(quotesData as QuoteData)?.quote}
          isLoading={quotesGenerating && !isRefreshing}
        />
        <ProgressSection
          progressPercent={progressPercent}
          isLoading={progressLoading && !isRefreshing}
        />
        <AIInsightSection
          aiInsight={aiInsight}
          isLoading={personalityLoading && !isRefreshing}
        />
        <TopGoalsSection
          topGoals={topGoals}
          progressPercent={progressPercent}
          isLoading={goalsLoading && !isRefreshing}
        />
        {isRefreshing && <View style={{ height: 20 }} />}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsVisible(true)}
      >
        <Ionicons name="sparkles-outline" size={24} color="white" />
        <Text style={styles.floatingButtonText}>Discuss anything with AI</Text>
      </TouchableOpacity>

      {/* Fixed: Only show loading modal for truly critical missing data */}
      <LoadingModal
        visible={showLoadingModal}
        loadingText={
          !isAuthReady
            ? 'Initializing your account...'
            : 'Loading your dashboard...'
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

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../components/styles/mainScreenStyles/HomeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useGenerateTasksQuery } from '../../api/HomeApi';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';
import LaunchModal from '../../components/ui/LaunchModal';
import { useGetUserQuery, useUserDetailsQuery } from '../../api/userApi';
import { useGetGoalsQuery } from '../../api/goals';
import { Goal } from '../../types/types';
import { setGoal } from '../../redux/slices/goalsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAiTaskGeneratorQuery } from '../../api/ai';

const HomeScreen = () => {
  const { userData, Uid } = useSelector((state: RootState) => state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const [cachedInsight, setCachedInsight] = useState<string | null>(null);
  const [shouldCallApi, setShouldCallApi] = useState(true);
  const dispatch = useDispatch();
  const { data: userDetails } = useUserDetailsQuery();
  const initialGoalId = userDetails?.firestoreData?.goals?.[0];
  const shouldSkip = !initialGoalId || initialGoalId.length === 0;

  console.log(initialGoalId);

  const { data: aiGeneratedTasksData, isLoading: aiTaskGeneratingLoading } =
    useAiTaskGeneratorQuery(initialGoalId, {
      skip: !initialGoalId, // Skip until initialGoalId is defined
    });
  console.log('aiGeneratedTasksData', aiGeneratedTasksData);
  const userName = userData?.user?.givenName;

  const { data, isLoading } = useGenerateTasksQuery(Uid!);
  const { data: goalsData } = useGetGoalsQuery() as { data?: Goal[] };

  useEffect(() => {
    if (goalsData) {
      dispatch(setGoal(goalsData));
    }
  }, [goalsData, dispatch]);

  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!, {
      skip: !shouldCallApi,
    });

  const aiInsight = personalityData?.aiInsight || 'No AI insight available.';

  const todaysFocus =
    data?.todaysFocus ||
    'Avoid distractions and focus on your top priority tasks today.';
  useEffect(() => {
    const checkCachedInsight = async () => {
      const cached = await AsyncStorage.getItem('aiInsightCache');
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        if (age < 86400000) {
          setCachedInsight(parsed.aiInsight);
          setShouldCallApi(false); // ❌ Skip API call
        }
      }
    };
    checkCachedInsight();
  }, []);

  useEffect(() => {
    if (personalityData?.aiInsight && shouldCallApi) {
      AsyncStorage.setItem(
        'aiInsightCache',
        JSON.stringify({
          aiInsight: personalityData.aiInsight,
          timestamp: Date.now(),
        }),
      );
      setCachedInsight(personalityData.aiInsight);
    }
  }, [personalityData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingsSection}>
        <Text style={styles.greeting}>Welcome, {userName}👋</Text>
        <Text style={styles.subGreeting}>
          Here's what your AI planned for today
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Today's Focus</Text>
          <View style={[styles.taskCard, styles.taskCardPending]}>
            <Text style={[styles.taskText]}>
              {isLoading ? <ActivityIndicator /> : todaysFocus}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Your Progress</Text>
          <View style={styles.progressCard}>
            <Text style={styles.progressText}>Keep Going🔥</Text>
            <Text style={styles.progressSubText}>
              Your progress will be displayed here soon.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧠 AI Insight</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              {isPersonalityLoading && !cachedInsight ? (
                <ActivityIndicator />
              ) : (
                cachedInsight ?? aiInsight
              )}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Your Top Goals</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 10 }}
          >
            {goalsData?.map(goal => (
              <View
                key={goal.id}
                style={[styles.goalCard, { marginRight: 16 }]}
              >
                <Text style={styles.goalTitle}>
                  {goal.category ?? 'No category'}
                </Text>

                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBar, { width: `0%` }]} />
                </View>

                <Text style={styles.progressPercent}>0% complete</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsVisible(true)}
      >
        <Ionicons name="sparkles-outline" size={24} color="white" />
        <Text style={styles.floatingButtonText}>Plan My Day with AI</Text>
      </TouchableOpacity>
      <LoadingModal
        visible={isPersonalityLoading || isLoading || aiTaskGeneratingLoading}
        loadingText={
          isPersonalityLoading
            ? 'Analyzing Personality...'
            : isLoading
            ? 'Generating Task...'
            : aiTaskGeneratingLoading
            ? 'AI Generating Tasks...'
            : 'Retrieving Data...'
        }
      />
      <LaunchModal
        visible={isVisible}
        LaunchText="This feature is in beta mode and will be available soon..."
        onClose={() => {
          setIsVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

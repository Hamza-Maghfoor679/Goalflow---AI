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
import { useGenerateTaskswithAiQuery } from '../../api/HomeApi';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';
import LaunchModal from '../../components/ui/LaunchModal';
import { useUserDetailsQuery } from '../../api/userApi';
import { useGetGoalsQuery } from '../../api/goals';
import { Goal } from '../../types/types';
import { setGoal } from '../../redux/slices/goalsSlice';
import { getProgressColor } from '../../utils/progress';
import { useGetProgressQuery } from '../../api/tasks';

const HomeScreen = () => {
  const { userData, Uid, idToken } = useSelector(
    (state: RootState) => state.auth,
  );
  console.log(idToken);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const { data: userDetails } = useUserDetailsQuery();
  const initialGoalId = userDetails?.firestoreData?.goals?.[0] ?? null;
  const userName = userData?.user?.givenName;
  const {
    data: goalProgressData,
  } = useGetProgressQuery({ goalId: initialGoalId });
  const progressPercent = goalProgressData?.progressPercent ?? 0;
  const {
    data,
    isLoading: aiGeneratingTasksLoading,
  } = useGenerateTaskswithAiQuery({ goalId: initialGoalId, phase: 6 });
  const { data: goalsData } = useGetGoalsQuery() as { data?: Goal[] };
  useEffect(() => {
    if (goalsData) {
      dispatch(setGoal(goalsData));
    }
    console.log('goalsData', goalsData);
  }, [goalsData, dispatch]);

  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!);
  const aiInsight = personalityData?.data?.aiInsight || 'No AI insight available.';

  const todaysFocus =
    data?.todaysFocus ||
    'Avoid distractions and focus on your top priority tasks today.';

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
              {aiGeneratingTasksLoading ? <ActivityIndicator /> : todaysFocus}
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
              {isPersonalityLoading ? (
                <ActivityIndicator />
              ) : (
                aiInsight
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
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, { marginRight: 16 }]}
              >
                <Text style={styles.goalTitle}>
                  {goal.category
                    ? goal.category.charAt(0).toUpperCase() +
                      goal.category.slice(1)
                    : 'No category'}
                </Text>
                <Text style={styles.goalDesc}>
                  {goal.category
                    ? goal.title.charAt(0).toUpperCase() +
                      goal.title.slice(1, 24) +
                      '...'
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

                <Text style={styles.progressPercent}>0% complete</Text>
              </TouchableOpacity>
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
        visible={isPersonalityLoading || aiGeneratingTasksLoading}
        loadingText={
          isPersonalityLoading
            ? 'Analyzing Personality...'
            : aiGeneratingTasksLoading
            ? `AI Generating Tasks for Phase...`
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

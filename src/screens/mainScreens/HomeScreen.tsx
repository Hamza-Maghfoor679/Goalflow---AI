import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../components/styles/mainScreenStyles/HomeStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useGenerateTasksQuery } from '../../api/HomeApi';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';
import LaunchModal from '../../components/ui/LaunchModal';
import { useGetUserQuery } from '../../api/userApi';

const HomeScreen = () => {
  const { userData, Uid } = useSelector((state: RootState) => state.auth);
  const [isVisible, setIsVisible] = React.useState(false);

  const userName = userData?.user?.givenName;

  const { data, error, isLoading } = useGenerateTasksQuery(Uid!);
  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!);
  const { data: usersData } = useGetUserQuery(Uid!);
  const rawCategory =
    usersData?.firestoreData?.onboardingPayload?.category || 'general';
  const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  const aiInsight = personalityData?.aiInsight || 'No AI insight available.';

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
              {isPersonalityLoading ? <ActivityIndicator /> : aiInsight}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Your Top Goals</Text>

          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>{category}</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBar, { width: `${0}%` }]} />
            </View>
            <Text style={styles.progressPercent}>0% complete</Text>
          </View>
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
        visible={isPersonalityLoading}
        loadingText={
          isPersonalityLoading
            ? 'Analyzing Personality...'
            : isLoading
            ? 'Generating Task...'
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

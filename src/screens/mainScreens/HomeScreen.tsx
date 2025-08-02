import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../components/styles/mainScreenStyles/HomeStyle';
import { goals, tasks } from '../../constants/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const HomeScreen = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const userName = userData?.user?.givenName;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingsSection}>
        <Text style={styles.greeting}>Welcome back, {userName}👋</Text>
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
          {tasks.map(task => (
            <View
              key={task.id}
              style={[
                styles.taskCard,
                task.done ? styles.taskCardDone : styles.taskCardPending,
              ]}
            >
              <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                {task.title}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Your Progress</Text>
          <View style={styles.progressCard}>
            <Text style={styles.progressText}>3-Day Streak 🔥</Text>
            <Text style={styles.progressSubText}>
              Keep going, you're doing great!
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧠 AI Insight</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              People like you tend to succeed when they start with small wins.
              Focus on your sleep routine today!
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Your Top Goals</Text>
          <FlatList
            data={goals}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>{item.title}</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[styles.progressBar, { width: `${item.progress}%` }]}
                  />
                </View>
                <Text style={styles.progressPercent}>
                  {item.progress}% complete
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => console.log('Plan my day pressed')}
      >
        <Ionicons name="sparkles-outline" size={24} color="white" />
        <Text style={styles.floatingButtonText}>Plan My Day with AI</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  );
};

export default HomeScreen;
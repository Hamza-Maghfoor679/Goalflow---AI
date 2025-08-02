import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CategoryCard } from '../../components/ui/CategoryCard';

const categories = [
  { title: 'Career', image: require('../../assets/images/career.webp') },
  { title: 'Health', image: require('../../assets/images/health.webp') },
  { title: 'Fitness', image: require('../../assets/images/fitness.jpg') },
  { title: 'Finance', image: require('../../assets/images/finance.webp') },
  { title: 'Spirituality', image: require('../../assets/images/spirit.webp') },
  { title: 'Relationship', image: require('../../assets/images/relationship.jpg') },
  { title: 'Creativity', image: require('../../assets/images/creativity.jpg') },
  { title: 'Personality', image: require('../../assets/images/personality.jpg') },
];

const GoalCategory = () => {
  const navigation = useTypedNavigation();

  // Ensure anonymous user exists
  const ensureAnonymousUser = async () => {
    if (!auth().currentUser) {
      await auth().signInAnonymously();
    }
    return auth().currentUser;
  };

  // Save selected category to Firestore
  const saveSelectedCategory = async (category: string) => {
    const user = await ensureAnonymousUser();
    console.log('User>>>>>>>>', user)
    if (!user) throw new Error('User not available');
    await firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
          selectedCategories: [category.toLowerCase()],
          onboardingStep: 'categories',
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Goal Nature</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {categories.map((cat, index) => {
            const lower = cat.title.toLowerCase();
            return (
              <CategoryCard
                key={index}
                title={cat.title}
                image={cat.image}
                onPress={async () => {
                  try {
                    await saveSelectedCategory(lower);
                    navigation.navigate('Onboarding', { category: lower });
                  } catch (e) {
                    console.error('Error selecting category:', e);
                    // TODO: Show user-friendly message (e.g., toast/snackbar)
                  }
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoalCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#393E46',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 50,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

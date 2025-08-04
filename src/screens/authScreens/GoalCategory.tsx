import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CategoryCard } from '../../components/ui/CategoryCard';
import { categories } from '../../constants/utils';
import { styles } from '../../components/styles/goalCategoryStyles';

const GoalCategory = () => {
  const navigation = useTypedNavigation();

  const ensureAnonymousUser = async () => {
    try {
      if (!auth().currentUser) {
        await auth().signInAnonymously();
      }
      console.log('Current user:', auth().currentUser?.uid);
      return auth().currentUser;
    } catch (error) {
      console.error('Error with anonymous authentication:', error);
      return null;
    }
  };

  const saveSelectedCategoryInBackground = async (category: string) => {
    try {
      const user = await ensureAnonymousUser();
      if (!user) {
        console.warn('Could not save category - user not available');
        return;
      }
      
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set(
          {
            selectedCategories: [category.toLowerCase()],
            onboardingStep: 'categories',
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      console.log('Category saved successfully in background');
    } catch (error) {
      console.error('Error saving category in background:', error);
    }
  };

  const handleCategorySelect = (categoryTitle: string) => {
    const lower = categoryTitle.toLowerCase();
    navigation.navigate('Onboarding', { category: lower });
    
    saveSelectedCategoryInBackground(lower);
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
            return (
              <CategoryCard
                key={index}
                title={cat.title}
                image={cat.image}
                onPress={() => handleCategorySelect(cat.title)}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoalCategory;

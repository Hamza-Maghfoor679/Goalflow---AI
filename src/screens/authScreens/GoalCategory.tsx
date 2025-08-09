import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CategoryCard } from '../../components/ui/CategoryCard';
import { categories } from '../../constants/utils';
import {
  modalStyles,
  styles,
} from '../../components/styles/goalCategoryStyles';
import CustomModal from '../../components/ui/Modal';

const GoalCategory = () => {
  const navigation = useTypedNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [GoalDefinition, setGoalDefinition] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [goalCategory, setGoalCategory] = useState<string>('');
  const [timeFrame, setTimeFrame] = useState<string>('');

  const isDisabled =
    GoalDefinition.trim() === '' ||
    age.trim() === '' ||
    timeFrame.trim() === '';

  const ensureAnonymousUser = async () => {
    try {
      if (!auth().currentUser) {
        await auth().signInAnonymously();
      }
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
    } catch (error) {
      console.error('Error saving category in background:', error);
    }
  };

  const handleCategorySelect = (categoryTitle: string) => {
    const lower = categoryTitle.toLowerCase();
    setGoalCategory(lower);
    setIsVisible(true);
    saveSelectedCategoryInBackground(lower);
  };

  const handleSubmit = (data: { data: string }) => {
    setIsVisible(false);
    setGoalDefinition(data.data);
    navigation.navigate('Onboarding', {
      category: goalCategory,
      input: data.data,
      age: age,
      timeFrame: 'I want to achieve this goal in/by ' + timeFrame,
    });
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
      <CustomModal
        disabled={isDisabled}
        value={GoalDefinition}
        title={`In one sentence, what do you want to achieve specifically in ${goalCategory}`}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSubmit={handleSubmit}
        setValue={setGoalDefinition}
        placeholder="Write Specific Goal Here"
      >
        <TextInput
          placeholder={'Enter your Age'}
          placeholderTextColor="#999"
          style={[modalStyles.modalInput, modalStyles.multilineInput]}
          returnKeyType="done"
          multiline
          value={age}
          onChangeText={setAge}
          textAlignVertical="top"
          keyboardType="numeric"
        />
        <TextInput
          placeholder={
            'In how much time do you want to achieve this? Write in weeks, months, years. Specify!'
          }
          placeholderTextColor="#999"
          style={[modalStyles.modalInput, modalStyles.multilineInput]}
          returnKeyType="done"
          multiline
          value={timeFrame}
          onChangeText={setTimeFrame}
          textAlignVertical="top"
        />
      </CustomModal>
    </SafeAreaView>
  );
};

export default GoalCategory;

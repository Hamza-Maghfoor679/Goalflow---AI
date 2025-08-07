import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CategoryCard } from '../../components/ui/CategoryCard';
import { categories } from '../../constants/utils';
import { styles } from '../../components/styles/goalCategoryStyles';
import CustomModal from '../../components/ui/Modal';

const GoalCategory = () => {
  const navigation = useTypedNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  console.log('selectedCategory:', selectedCategory);
  
  const [age, setAge] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const isInputValid = age.trim() !== '' ;

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
      console.log('Category saved successfully in background');
    } catch (error) {
      console.error('Error saving category in background:', error);
    }
  };

  const handleCategorySelect = (categoryTitle: string) => {
    const lower = categoryTitle.toLowerCase();
    setSelectedCategory(lower);
    setIsVisible(true);
    console.log('Selected category:', lower);
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
      <CustomModal
        // disabled={isInputValid ? false : true}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSubmit={data => {
          console.log('Submitted data:', data);
          setIsVisible(false);
          setInput(data.data);
          if (selectedCategory) {
            navigation.navigate('Onboarding', {
              category: selectedCategory,
              input: data.data,
              age: age,
            });
          }
        }}
        title="In one sentence, what do you want to achieve?"
      >
        <TextInput
          placeholder="How Old are you? (In Years)"
          placeholderTextColor="#999"
          style={[modalStyles.modalInput, modalStyles.multilineInput]}
          returnKeyType="done"
          multiline
          value={age}
          onChangeText={setAge}
          textAlignVertical="top"
          keyboardType="numeric"
        />
      </CustomModal>
    </SafeAreaView>
  );
};

export default GoalCategory;

const modalStyles = StyleSheet.create({
  modalInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#000',
  },
  multilineInput: {
    height: 100,
  },
});

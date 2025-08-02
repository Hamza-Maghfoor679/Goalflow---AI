import React, { useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import {
  GoalCategory,
  habitQuestionsByCategory,
} from '../../constants/Questions';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { onboardingStyles } from '../../components/styles/styles';
import UserInfoModal from '../../components/ui/UserInfoModal';
import { RouteProp, useRoute } from '@react-navigation/native';
import Button from '../../components/ui/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import { RootStackParamList } from '../../types';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useTypedNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Onboarding'>>();
  const { category } = route.params || {};

  const normalizedCategory = category?.toLowerCase() as GoalCategory;
  const selectedQuestions = habitQuestionsByCategory[normalizedCategory] || [];

  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(selectedQuestions.length).fill(null),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    'fadeInLeft' | 'fadeInRight'
  >('fadeInRight');

  const [isModalVisible, setModalVisible] = useState(false);
  const [personality, setPersonality] = useState('');
  const [trauma, setTrauma] = useState('');
  const [preferences, setPreferences] = useState('');

  const handleSelect = (index: number, option: string) => {
    const updated = [...answers];
    updated[index] = option;
    setAnswers(updated);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setAnimationDirection('fadeInLeft');
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (!answers[currentIndex]) {
      Toast.show({
        type: 'error',
        text1: 'Please select an answer',
        text2: 'You must answer the question before continuing.',
        text1Style: { fontSize: 14 },
        text2Style: { fontSize: 11 },
      });
      return;
    }

    if (currentIndex < selectedQuestions.length - 1) {
      setAnimationDirection('fadeInRight');
      setCurrentIndex(prev => prev + 1);
    } else {
      setModalVisible(true);
    }
  };

  const handleModalSubmit = ({
    personality,
    trauma,
    preferences,
  }: {
    personality: string;
    trauma: string;
    preferences: string;
  }) => {
    console.log('Answers:', answers);
    console.log('Personality:', personality);
    console.log('Trauma:', trauma);
    console.log('Preferences:', preferences);

    setModalVisible(false);
    navigation.navigate('Login');
  };

  if (!category || selectedQuestions.length === 0) {
    return (
      <View style={[onboardingStyles.container, { justifyContent: 'center' }]}>
        <Text style={onboardingStyles.question}>
          No questions found for this goal.
        </Text>
      </View>
    );
  }

  const current = selectedQuestions[currentIndex];
  const isLast = currentIndex === selectedQuestions.length - 1;

  return (
    <View style={onboardingStyles.container}>
      <Animatable.View
        key={currentIndex}
        animation={animationDirection}
        duration={500}
        style={{ width }}
      >
        <View style={onboardingStyles.slide}>
          {currentIndex > 0 && (
            <Pressable onPress={handleBack} style={onboardingStyles.backButton}>
              <Entypo name="chevron-left" size={24} color="#113F67" />
            </Pressable>
          )}

          <Text style={onboardingStyles.question}>{current.question}</Text>

          <View style={onboardingStyles.optionsWrapper}>
            {current.options.map(option => {
              const isSelected = answers[currentIndex] === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => handleSelect(currentIndex, option)}
                  style={[
                    onboardingStyles.option,
                    isSelected && onboardingStyles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      onboardingStyles.optionText,
                      isSelected && onboardingStyles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Button title={isLast ? 'Finish' : 'Next'} onPress={handleNext} />
          {
            currentIndex > 0 &&
          <Button color='grey' title='Back' onPress={handleBack} />
          }
        </View>
      </Animatable.View>

      <UserInfoModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        personality={personality}
        trauma={trauma}
        preferences={preferences}
        setPersonality={setPersonality}
        setTrauma={setTrauma}
        setPreferences={setPreferences}
      />
    </View>
  );
};

export default Onboarding;

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/ui/Button';
import { styles } from '../../components/styles/mainScreenStyles/PersonalityStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';

interface PersonalityData {
  type: string;
  title: string;
  traits: string[];
  description: string;
  impact: string;
  notablePeople?: string[];
}

const personality: PersonalityData = {
  type: 'INTJ',
  title: 'The Architect',
  traits: ['Introverted', 'Strategic', 'Future-Focused'],
  description:
    'You are analytical and independent, often striving for innovation and mastery. You prefer planning over spontaneity and need time alone to recharge.',
  impact:
    'Your goal plans are designed for long-term structure, minimal distractions, and deep work. Expect weekly tracking and milestone-based achievements.',
  notablePeople: [
    'Elon Musk',
    'Mark Zuckerberg',
    'Isaac Newton',
    'Nikola Tesla',
    'Albert Einstein',
    'Hrithik Roshan',
    'Ronaldo',
  ],
};

type FamousPerson = {
  name: string;
};

const PersonalityScreen: React.FC = () => {
  const { Uid } = useSelector((state: RootState) => state.auth);

  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!);
  const { impactOnGoals, description, personalityType } = personalityData || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.fixedHeader}>
          <Text style={styles.heading}>🧠 Your Personality Profile</Text>

          <View style={styles.card}>
            <Text style={styles.personalityType}>
              {isPersonalityLoading ? <ActivityIndicator /> : personalityType}
            </Text>
            <Text style={styles.personalityTitle}>{personality.title}</Text>
          </View>

          <View style={styles.traitsContainer}>
            {personality.traits.map((trait, index) => (
              <View key={index} style={styles.traitPill}>
                <Text style={styles.traitText}>{trait}</Text>
              </View>
            ))}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>🧠 About You</Text>
          <Text style={styles.paragraph}>
            {isPersonalityLoading ? <ActivityIndicator /> : description}
          </Text>

          <Text style={styles.sectionTitle}>
            🧩 How This Impacts Your Goals
          </Text>
          <Text style={styles.paragraph}>
            {isPersonalityLoading ? <ActivityIndicator /> : impactOnGoals}
          </Text>

          <>
            <Text style={styles.sectionTitle}>🔍 Famous People Like You</Text>
            {isPersonalityLoading ? (
              <ActivityIndicator />
            ) : (
              personalityData?.famousPeople?.map(
                (person: FamousPerson, index: number) => (
                  <Text key={index} style={styles.listItem}>
                    • {person.name}
                  </Text>
                ),
              )
            )}
          </>

          <View style={{ height: 100 }} />
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <Button title="Retake Personality Test" />
        </View>
      </View>
      <LoadingModal
        visible={isPersonalityLoading}
        loadingText={
          isPersonalityLoading
            ? 'Analyzing Personality...'
            : 'Retrieving Data...'
        }
      />
    </SafeAreaView>
  );
};

export default PersonalityScreen;

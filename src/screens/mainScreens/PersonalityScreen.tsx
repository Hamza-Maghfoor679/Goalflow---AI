import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Button from '../../components/ui/Button';
import { styles } from '../../components/styles/mainScreenStyles/PersonalityStyle';

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

const PersonalityScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Fixed Header Section */}
        <View style={styles.fixedHeader}>
          <Text style={styles.heading}>🧠 Your Personality Profile</Text>
          
          <View style={styles.card}>
            <Text style={styles.personalityType}>{personality.type}</Text>
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

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>About You</Text>
          <Text style={styles.paragraph}>{personality.description}</Text>

          <Text style={styles.sectionTitle}>
            🧩 How This Impacts Your Goals
          </Text>
          <Text style={styles.paragraph}>{personality.impact}</Text>

          {personality.notablePeople && (
            <>
              <Text style={styles.sectionTitle}>🔍 Famous People Like You</Text>
              <View style={styles.listContainer}>
                {personality.notablePeople.map((name, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {name}
                  </Text>
                ))}
              </View>
            </>
          )}

          {/* Spacer to avoid overlap with fixed button */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <Button title="Retake Personality Test" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalityScreen;


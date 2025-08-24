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
import LaunchModal from '../../components/ui/LaunchModal';

interface FamousPerson {
  name: string;
}

const PersonalityScreen: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { Uid } = useSelector((state: RootState) => state.auth);

  const { data: personalityData, isLoading } = useGeneratePersonalityQuery(Uid!, {
    skip: !Uid,
  });

  const {
    impactOnGoals,
    description,
    personalityType,
    personalityName,
    personalityTraits: traitsString = '',
    famousPeople = [],
  } = personalityData || {};

  const traitsArray =
    typeof traitsString === 'string'
      ? traitsString.split(',').map(trait => trait.trim())
      : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.fixedHeader}>
          <Text style={styles.heading}>🧠 Your Personality Profile</Text>

          <View style={styles.card}>
            <Text style={styles.personalityType}>
              {isLoading ? <ActivityIndicator /> : personalityType}
            </Text>
            <Text style={styles.personalityTitle}>{personalityName}</Text>
          </View>

          <View style={styles.traitsContainer}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              traitsArray.map((trait, index) => (
                <View key={index} style={styles.traitPill}>
                  <Text style={styles.traitText}>{trait}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>🧠 About You</Text>
          <Text style={styles.paragraph}>
            {isLoading ? <ActivityIndicator /> : description}
          </Text>

          <Text style={styles.sectionTitle}>🧩 How This Impacts Your Goals</Text>
          <Text style={styles.paragraph}>
            {isLoading ? <ActivityIndicator /> : impactOnGoals}
          </Text>

          <Text style={styles.sectionTitle}>🔍 Famous People Like You</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            famousPeople.map((person: FamousPerson, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {person.name}
              </Text>
            ))
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <Button
            title="Retake Personality Test"
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>

      <LaunchModal
        visible={isVisible}
        LaunchText="This feature is in testing and will be available soon..."
        onClose={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default PersonalityScreen;

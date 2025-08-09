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
import LaunchModal from '../../components/ui/LaunchModal';

interface PersonalityData {
  type: string;
  title: string;
  traits: string[];
  description: string;
  impact: string;
  notablePeople?: string[];
}

type FamousPerson = {
  name: string;
};

const PersonalityScreen: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { Uid } = useSelector((state: RootState) => state.auth);

  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!);
  const {
    impactOnGoals,
    description,
    personalityType,
    personalityName,
    personalityTraits: traitsString = '',
  } = personalityData || {};
  console.log(personalityData);

  const personalityTraits = traitsString.split(',').map((t: any) => t.trim()); // ✅ convert to array

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.fixedHeader}>
          <Text style={styles.heading}>🧠 Your Personality Profile</Text>

          <View style={styles.card}>
            <Text style={styles.personalityType}>
              {isPersonalityLoading ? <ActivityIndicator /> : personalityType}
            </Text>
            <Text style={styles.personalityTitle}>{personalityName}</Text>
          </View>

          <View style={styles.traitsContainer}>
            {personalityTraits.map((trait: string, index: number) => (
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
          <Button
            title="Retake Personality Test"
            onPress={() => setIsVisible(true)}
          />
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
      <LaunchModal
        visible={isVisible}
        LaunchText="This feature is in testing and will be available soon..."
        onClose={() => {
          setIsVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default PersonalityScreen;

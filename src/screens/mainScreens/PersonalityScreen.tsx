import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LaunchModal from '../../components/ui/LaunchModal';

interface FamousPerson {
  name: string;
}

const PersonalityScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { Uid } = useSelector((state: RootState) => state.auth);

  // Local state for caching
  const [cachedPersonality, setCachedPersonality] = useState<any>(null);
  const [shouldCallApi, setShouldCallApi] = useState(true);

  // Check cache on mount
  useEffect(() => {
    const checkCachedPersonality = async () => {
      const cached = await AsyncStorage.getItem('personalityCache');
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        if (age < 86400000) {
          setCachedPersonality(parsed.personality);
          setShouldCallApi(false); // Skip API call if cache is valid
        }
      }
    };
    checkCachedPersonality();
  }, []);

  // Fetch personality data only if shouldCallApi is true
  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!, {
      skip: !shouldCallApi,
    });

  // Save to cache when new data arrives
  useEffect(() => {
    if (personalityData && shouldCallApi) {
      AsyncStorage.setItem(
        'personalityCache',
        JSON.stringify({
          personality: personalityData,
          timestamp: Date.now(),
        }),
      );
      setCachedPersonality(personalityData);
    }
  }, [personalityData]);

  // Use cached data if available, else API data or empty object
  const personality = cachedPersonality || personalityData || {};

  const {
    impactOnGoals,
    description,
    personalityType,
    personalityName,
    personalityTraits: traitsString = '',
    famousPeople = [],
  } = personality;

  // Convert traits string to array if needed
  const traitsStringSafe = typeof traitsString === 'string' ? traitsString : '';
  const personalityTraits = traitsStringSafe
    ? traitsStringSafe.split(',').map((t: string) => t.trim())
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.fixedHeader}>
          <Text style={styles.heading}>🧠 Your Personality Profile</Text>

          <View style={styles.card}>
            <Text style={styles.personalityType}>
              {isPersonalityLoading && !cachedPersonality ? (
                <ActivityIndicator />
              ) : (
                personalityType
              )}
            </Text>
            <Text style={styles.personalityTitle}>{personalityName}</Text>
          </View>

          <View style={styles.traitsContainer}>
            {isPersonalityLoading && !cachedPersonality ? (
              <ActivityIndicator />
            ) : (
              personalityTraits?.map((trait: string, index: number) => (
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
            {isPersonalityLoading && !cachedPersonality ? (
              <ActivityIndicator />
            ) : (
              description
            )}
          </Text>

          <Text style={styles.sectionTitle}>
            🧩 How This Impacts Your Goals
          </Text>
          <Text style={styles.paragraph}>
            {isPersonalityLoading && !cachedPersonality ? (
              <ActivityIndicator />
            ) : (
              impactOnGoals
            )}
          </Text>

          <Text style={styles.sectionTitle}>🔍 Famous People Like You</Text>
          {isPersonalityLoading && !cachedPersonality ? (
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

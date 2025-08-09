import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../components/styles/mainScreenStyles/ProfileStyle';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { clearIdToken } from '../../redux/slices/tokenSlice';
import { RootState } from '../../redux/store/store';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';
import LaunchModal from '../../components/ui/LaunchModal';
import { useGetUserQuery } from '../../api/userApi';

const ProfileScreen: React.FC = () => {
  const navigation = useTypedNavigation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(false);
  const { Uid } = useSelector((state: RootState) => state.auth);

  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!);
  const { personalityType, wellnessScore } = personalityData || {};
  const { data: user } = useGetUserQuery(Uid!);
  console.log('userData', user?.firestoreData?.onboardingPayload);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const userName = userData?.user?.givenName;
  const usersData = user?.firestoreData?.onboardingPayload || {};
  const { trauma, preferences } = usersData;

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(clearIdToken());
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <View>
          <Text style={styles.name}>Hi, {userName}</Text>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Goals Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{personalityType}</Text>
          <Text style={styles.statLabel}>Personality</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{wellnessScore}%</Text>
          <Text style={styles.statLabel}>Wellness Score</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Profile Summary</Text>
        <View style={styles.infoCard}>
          <Text>Personality: {personalityType}</Text>
          <Text>Trauma History: {trauma ? 'provided' : 'Not Provided'}</Text>
          <Text>Preferences: {preferences ? 'provided' : 'Not Provided'}</Text>
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setIsVisible(true)}
        >
          <Text style={styles.updateButtonText}>Update Preferences</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingItem]} onPress={signOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <LoadingModal
        visible={isPersonalityLoading}
        loadingText={'Retrieving Data...'}
      />
      <LaunchModal
        visible={isVisible}
        LaunchText="This feature is in testing and will be available soon..."
        onClose={() => {
          setIsVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

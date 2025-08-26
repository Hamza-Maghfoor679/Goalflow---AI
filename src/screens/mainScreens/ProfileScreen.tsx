import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../components/styles/mainScreenStyles/ProfileStyle';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthState } from '../../redux/slices/tokenSlice';
import { persistor, RootState } from '../../redux/store/store';
import { useGeneratePersonalityQuery } from '../../api/personalityApi';
import LoadingModal from '../../components/ui/LoadingModal';
import LaunchModal from '../../components/ui/LaunchModal';
import { useGetUserQuery } from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen: React.FC = () => {
  const navigation = useTypedNavigation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const { Uid } = useSelector((state: RootState) => state.auth);

  const { data: personalityData, isLoading: isPersonalityLoading } =
    useGeneratePersonalityQuery(Uid!, );

  const personality =  personalityData || {};
  const { personalityType, wellnessScore } = personality;

  const { data: user } = useGetUserQuery(Uid!);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const userName = userData?.user?.givenName;
  const usersData = user?.firestoreData?.onboardingPayload || {};
  console.log('userrrrrrrr', userData);
  
  const { trauma, preferences } = usersData;

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(resetAuthState());
      await AsyncStorage.removeItem('persist:auth');
      await persistor.purge();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <View>
          <Text style={styles.name}>Hi, {userName || 'Guest'}</Text>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      {/* <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Goals Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {isPersonalityLoading  ? '...' : personalityType || '--'}
          </Text>
          <Text style={styles.statLabel}>Personality</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {isPersonalityLoading 
              ? '...'
              : wellnessScore != null
              ? `${wellnessScore}%`
              : '--'}
          </Text>
          <Text style={styles.statLabel}>Wellness</Text>
        </View>
      </View> */}

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Profile Summary</Text>
        <View style={styles.infoCard}>
          <Text>Personality: {personalityType || '--'}</Text>
          <Text>Trauma History: {trauma ? 'Provided' : 'Not Provided'}</Text>
          <Text>Preferences: {preferences ? 'Provided' : 'Not Provided'}</Text>
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setIsVisible(true)}
        >
          <Text style={styles.updateButtonText}>Update Preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={signOut}>
          <Text style={{color: '#b73333ff', fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <LoadingModal
        visible={isPersonalityLoading}
        loadingText={'Retrieving Data...'}
      />
      <LaunchModal
        visible={isVisible}
        LaunchText="This feature is in testing and will be available soon..."
        onClose={() => setIsVisible(false)}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

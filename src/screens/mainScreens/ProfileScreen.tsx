import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../components/styles/mainScreenStyles/ProfileStyle';

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <View>
          <Text style={styles.name}>Hi, Hamza</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Goals Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>INTJ</Text>
          <Text style={styles.statLabel}>Personality</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>84%</Text>
          <Text style={styles.statLabel}>Wellness Score</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Profile Summary</Text>
        <View style={styles.infoCard}>
          <Text>Lifestyle: Active</Text>
          <Text>Goal Focus: Career</Text>
          <Text>Personality: INTJ</Text>
          <Text>Trauma History: Provided</Text>
          <Text>Preferences: Morning Routine</Text>
        </View>
        <TouchableOpacity style={styles.updateButton}>
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
        <TouchableOpacity style={styles.settingItem}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

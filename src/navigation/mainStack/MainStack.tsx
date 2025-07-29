import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import HomeScreen from '../../screens/mainScreens/HomeScreen';
import ProfileScreen from '../../screens/mainScreens/ProfileScreen';
import GoalScreen from '../../screens/mainScreens/GoalScreen';
import PersonalityScreen from '../../screens/mainScreens/PersonalityScreen';

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Goals: undefined;
  Personality: undefined;
};

type TabItem = {
  key: keyof MainStackParamList;
  title: string;
  icon: string;
  component: React.ComponentType;
  iconType?: 'ionicons' | 'octicons';
};

const tabs: TabItem[] = [
  {
    key: 'Home',
    title: 'Home',
    icon: 'home',
    component: HomeScreen,
    iconType: 'ionicons',
  },
  {
    key: 'Goals',
    title: 'Goals',
    icon: 'goal',
    component: GoalScreen,
    iconType: 'octicons',
  },
  {
    key: 'Personality',
    title: 'Personality',
    icon: 'happy',
    component: PersonalityScreen,
    iconType: 'ionicons',
  },
  {
    key: 'Profile',
    title: 'Profile',
    icon: 'person',
    component: ProfileScreen,
    iconType: 'ionicons',
  },
];

const CustomBottomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState<keyof MainStackParamList>('Home');

  const renderScreen = () => {
    const activeTabData = tabs.find(tab => tab.key === activeTab);
    if (!activeTabData) return null;
    
    const Screen = activeTabData.component;
    return <Screen />;
  };

  const renderIcon = (tab: TabItem, isActive: boolean) => {
    const iconColor = isActive ? '#113F67' : '#8E8E93';
    
    if (tab.iconType === 'octicons') {
      return (
        <Octicons
          name='graph'
          size={24}
          color={iconColor}
        />
      );
    } else {
      return (
        <Ionicons
          name={isActive ? tab.icon : `${tab.icon}-outline`}
          size={24}
          color={iconColor}
        />
      );
    }
  };

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tabItem,
            activeTab === tab.key && styles.activeTabItem
          ]}
          onPress={() => setActiveTab(tab.key)}
          activeOpacity={0.7}
        >
          <View style={styles.tabContent}>
            {renderIcon(tab, activeTab === tab.key)}
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      {renderTabBar()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeTabItem: {
    // Additional styling for active tab if needed
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#113F67',
    fontWeight: '600',
  },
});

export default CustomBottomTabNavigator;
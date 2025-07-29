import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../../components/ui/CategoryCard';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';

const categories = [
  {
    title: 'Career',
    image: require('../../assets/images/career.webp'),
  },
  {
    title: 'Health',
    image: require('../../assets/images/health.webp'),
  },
  {
    title: 'Fitness',
    image: require('../../assets/images/fitness.jpg'),
  },
  {
    title: 'Finance',
    image: require('../../assets/images/finance.webp'),
  },
  {
    title: 'Spirituality',
    image: require('../../assets/images/spirit.webp'),
  },
  {
    title: 'Relationship',
    image: require('../../assets/images/relationship.jpg'),
  },
  {
    title: 'Creativity',
    image: require('../../assets/images/creativity.jpg'),
  },
  {
    title: 'Personality',
    image: require('../../assets/images/personality.jpg'),
  },
];

const GoalCategory = () => {
  const navigation = useTypedNavigation();

  const handleSelect = (title: string) => {
    navigation.navigate('Onboarding', { category: title });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Goal Nature</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              title={cat.title}
              image={cat.image}
              onPress={() => handleSelect(cat.title.toLowerCase())}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoalCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#393E46',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 50,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

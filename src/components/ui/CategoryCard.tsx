import React, { useRef } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type CategoryCardProps = {
  title: string;
  image?: any;
  onPress?: () => void;
  isSelected?: boolean
};

export const CategoryCard = ({ title, image, onPress, isSelected }: CategoryCardProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={styles.pressable}
      accessibilityRole="button"
      accessible
    >
      <Animated.View
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          { transform: [{ scale }] },
        ]}
      >
        {image ? (
          <ImageBackground source={image} style={styles.image} resizeMode="cover">
            <View style={styles.overlay}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    margin: 10,
  },
  card: {
    width: 160,
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});



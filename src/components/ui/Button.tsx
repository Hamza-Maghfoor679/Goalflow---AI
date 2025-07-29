import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Button = ({
  title = 'Press Me',
  onPress,
  color = '#113F67',
}: {
  title?: string;
  onPress?: () => void;
  color?: string;
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: color },
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 5,
    width: '100%'
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    width: '100%', 
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
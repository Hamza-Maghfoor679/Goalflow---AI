import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ThemedText } from './ThemedText';


const waveAnimation = {
  0: { transform: [{ rotate: '0deg' }] },
  0.25: { transform: [{ rotate: '25deg' }] },
  0.5: { transform: [{ rotate: '0deg' }] },
  0.75: { transform: [{ rotate: '25deg' }] },
  1: { transform: [{ rotate: '0deg' }] },
};

export function HelloWave() {
  return (
    <Animatable.View
      animation={waveAnimation}
      duration={600}
      iterationCount={4}
      easing="ease-in-out"
      style={styles.animatedView}
    >
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});

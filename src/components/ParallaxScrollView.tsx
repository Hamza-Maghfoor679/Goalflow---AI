import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme as useNativeColorScheme,
} from 'react-native';
import { useBottomTabOverflow } from './ui/TabBarBackground.ios';
import { ThemedView } from './ThemedView';



const HEADER_HEIGHT = 250;

type Props = {
  children: React.ReactNode;
  headerImage: React.ReactElement;
  headerBackgroundColor: { dark: string; light: string };
};

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useNativeColorScheme() ?? 'light';
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const bottom = useBottomTabOverflow();

  const translateY = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
  });

  const scale = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
    outputRange: [2, 1, 1],
    extrapolate: 'clamp',
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: headerBackgroundColor[colorScheme],
              transform: [{ translateY }, { scale }],
            },
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});

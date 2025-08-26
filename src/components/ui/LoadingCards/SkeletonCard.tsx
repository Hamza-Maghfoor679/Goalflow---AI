// components/ui/skeleton/SkeletonCard.tsx
import React, { useEffect, useState } from 'react';
import { View, Animated, ViewStyle } from 'react-native';

interface SkeletonCardProps {
  height?: number;
  style?: ViewStyle;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ height = 100, style = {} }) => {
  const shimmerAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnimation]);

  return (
    <View style={[{
      height,
      backgroundColor: '#f0f0f0',
      borderRadius: 12,
      marginVertical: 8,
      overflow: 'hidden',
    }, style]}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#e0e0e0',
          opacity: shimmerAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.8],
          }),
        }}
      />
    </View>
  );
};

export default SkeletonCard;
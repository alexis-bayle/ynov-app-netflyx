import { position } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';

export default function SkeletonMovieCard() {
  const { width } = Dimensions.get('window');
  const shimmerTranslateX = useSharedValue(-width);

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(width, {
        duration: 1200,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.System,
      }),
      2,
      true
    );
  }, [shimmerTranslateX, width]);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shimmerTranslateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.posterPlaceholder}>
        <Animated.View style={[styles.shimmer, shimmerStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 225,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  posterPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#3A3A3A',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '30%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
});

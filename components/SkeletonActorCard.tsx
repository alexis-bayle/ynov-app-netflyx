import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function SkeletonActorCard() {
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
    width: 100,
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },

  posterPlaceholder: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 100,
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

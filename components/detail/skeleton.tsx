import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import SkeletonMovieCard from '../SkeletonMovieCard';
import SkeletonActorCard from '../SkeletonActorCard';

export default function SkeletonCard() {
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
    <ScrollView>
      <View style={styles.skeletonContainer}>
        {/* Placeholder for the movie poster */}
        <View style={styles.posterPlaceholder}>
          <Animated.View style={[styles.shimmerOverlay, styles.shimmer, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        {/* Placeholder for the movie title */}
        <View style={styles.textPlaceholder}>
          <Animated.View style={[styles.shimmerOverlay, styles.shimmer, shimmerStyle]} />
        </View>

        {/* Placeholder for the subTitle */}
        <View style={[styles.textPlaceholder, { width: '80%', marginBottom: 50 }]}>
          <Animated.View style={[styles.shimmerOverlay, styles.shimmer, shimmerStyle]} />
        </View>

        {/* Placeholder for the movie description */}
        <View style={[styles.textPlaceholder, { width: '90%', height: 150, marginBottom: 25 }]}>
          <Animated.View style={[styles.shimmerOverlay, styles.shimmer, shimmerStyle]} />
        </View>

        {/* Placeholder for the actors carousel */}
        <View style={[styles.carouselContainer, { height: 80, marginBottom: 25 }]}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            horizontal
            maxToRenderPerBatch={2}
            renderItem={({ item }) => <SkeletonActorCard key={item} />}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 16,
            }}
          />
        </View>

        {/* Placeholder for the recommended movies carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            horizontal
            maxToRenderPerBatch={2}
            renderItem={({ item }) => <SkeletonMovieCard key={item} />}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 16,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  posterPlaceholder: {
    width: '100%',
    aspectRatio: 0.67,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  textPlaceholder: {
    width: '90%',
    height: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noMovies: {
    width: '100%',
    marginLeft: 16,
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
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

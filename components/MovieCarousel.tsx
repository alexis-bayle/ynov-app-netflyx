import { Movie } from '~/app/_core/interface/movieInterface';
import MovieCard from './MovieCard';
import { Box, Text } from '~/theme';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import SkeletonMovieCard from '~/components/SkeletonMovieCard';

export default function MovieCarousel({
  movies = [],
  title,
  containerStyle = {},
  loading = false,
}: Readonly<{
  movies: Movie[];
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}>) {
  const placeholderData = Array.from({ length: 5 }, (_, i) => i);
  return (
    <Box style={[containerStyle, styles.container]}>
      <Text variant="title" color="white" style={styles.title}>
        {title}
      </Text>
      {loading ? (
        <View style={styles.carouselContainer}>
          <FlatList
            data={placeholderData}
            horizontal
            maxToRenderPerBatch={2}
            renderItem={({ item }) => <SkeletonMovieCard key={item} />}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 16,
            }}
          />
        </View>
      ) : (
        <View id="carousel-component" style={styles.carouselContainer}>
          {movies.length > 0 && (
            <FlatList
              data={movies}
              renderItem={({ item, index }) => <MovieCard key={index} movie={item} />}
              horizontal
              maxToRenderPerBatch={2}
              contentContainerStyle={{
                paddingHorizontal: 16,
                gap: 16,
              }}
            />
          )}
          {movies.length === 0 && (
            <Text variant="body" color="white" style={styles.noMovies}>
              No movies found
            </Text>
          )}
        </View>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginLeft: 16,
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
});

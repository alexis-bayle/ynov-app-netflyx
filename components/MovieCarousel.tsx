import { Movie } from '~/app/_core/interface/movieInterface';
import MovieCard from './MovieCard';
import { Box, Text } from '~/theme';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export default function MovieCarousel({
  movies = [],
  title,
  containerStyle = {},
}: Readonly<{ movies: Movie[]; title: string; containerStyle?: StyleProp<ViewStyle> }>) {
  return (
    <Box style={[containerStyle, movies.length === 0 ? styles.container : {}]}>
      <Text variant="title" color="white">
        {title}
      </Text>
      <View id="carousel-component" style={styles.carouselContainer}>
        {movies.length > 0 && (
          <FlatList
            data={movies}
            renderItem={({ item, index }) => <MovieCard key={index} movie={item} />}
            horizontal
            contentContainerStyle={{
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
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: 50,
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

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
    <Box style={[containerStyle]}>
      <Text variant="title" color="white">
        {title}
      </Text>
      <View id="carousel-component" style={styles.carouselContainer}>
        <FlatList
          data={movies}
          renderItem={({ item, index }) => <MovieCard key={index} movie={item} />}
          horizontal
          contentContainerStyle={{
            gap: 16,
          }}
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

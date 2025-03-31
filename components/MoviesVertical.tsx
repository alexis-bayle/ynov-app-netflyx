import { Movie } from '~/app/_core/interface/movieInterface';
import MovieCard from './MovieCard';
import { Box, Text } from '~/theme';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export default function MoviesVertical({
  movies = [],
  title,
  containerStyle = {},
  page,
  setPage,
}: Readonly<{
  movies: Movie[];
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  page: number;
  setPage: (page: number) => void;
}>) {
  return (
    <Box style={[containerStyle, styles.container]}>
      <View id="carousel-component" style={styles.carouselContainer}>
        {movies.length > 0 && (
          <FlatList
            data={movies}
            renderItem={({ item, index }) => (
              <View style={{ paddingHorizontal: 8 }}>
                <MovieCard movie={item} />
              </View>
            )}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={{
              paddingBottom: 12,
            }}
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              setPage(page + 1);
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
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  noMovies: {
    width: '100%',
    marginLeft: 16,
  },
});

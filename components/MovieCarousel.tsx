import { Movie } from '~/app/_core/interface/movieInterface';
import MovieCard from './MovieCard';
import { Box, Text } from '~/theme';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const PAGE_WIDTH = Dimensions.get('window').width;

const COUNT = 2;

export default function MovieCarousel({
  movies = [],
  title,
}: Readonly<{ movies: Movie[]; title: string }>) {
  return (
    <Box flex={1} height={350} marginLeft='l_32'>
      <Text variant="title" color="white">
        {title}
      </Text>
      <View id="carousel-component" style={styles.carouselContainer}>
        <Carousel
          loop
          vertical={false}
          width={PAGE_WIDTH / COUNT}
          height={300}
          style={{
            width: PAGE_WIDTH,
          }}
          data={movies}
          renderItem={({ item, index }) => <MovieCard key={index} movie={item} />}
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

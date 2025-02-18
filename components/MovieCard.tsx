import { Image, StyleSheet } from 'react-native';
import { imageUrl } from '~/app/_core/helpers/helper';
import { Movie } from '~/app/_core/interface/movieInterface';
import { Box } from '~/theme';

export default function MovieCard({ movie }: Readonly<{ movie: Movie }>) {
  return (
    <Box  width={'80%'} height={'80%'} justifyContent="center" alignItems="center">
      <Image source={{ uri: imageUrl + movie?.poster_path }} style={[styles.moviePoster]} />
    </Box>
  );
}

const styles = StyleSheet.create({
  moviePoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
});

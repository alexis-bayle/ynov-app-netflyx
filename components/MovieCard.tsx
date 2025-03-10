import { useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { imageUrl } from '~/app/_core/helpers/helper';
import { Movie } from '~/app/_core/interface/movieInterface';

export default function MovieCard({ movie }: Readonly<{ movie: Movie }>) {
  const router = useRouter();

  function onPress() {
    Vibration.vibrate(100);
    router.push({
      pathname: '/movieDetail/[id]',
      params: { id: movie.id },
    });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}>
      <Image source={{ uri: imageUrl + movie?.poster_path }} style={styles.moviePoster} />
    </TouchableOpacity>
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
  moviePoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
});

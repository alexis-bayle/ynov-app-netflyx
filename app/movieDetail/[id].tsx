import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import { Box, Text } from '~/theme';
import { MovieService } from '../_core/service/movieService';
import { Movie } from '../_core/interface/movieInterface';
import { LinearGradient } from 'expo-linear-gradient';
import { getRandomInt, getStarRating, imageUrl } from '../_core/helpers/helper';
import MovieCarousel from '~/components/MovieCarousel';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const win = Dimensions.get('window');

export default function MovieDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<Movie>();
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [rating, setRating] = useState('');
  const [posterHeight, setPosterHeight] = useState(win.height * 0.6); // Default height
  const params = useLocalSearchParams();

  useEffect(() => {
    MovieService.getMovieDetails(Number(params.id))
      .then((response) => {
        setMovieData(response);
        setRating(getStarRating(response?.vote_average, 5));
        if (response?.poster_path) {
          Image.getSize(imageUrl + response.poster_path, (width, height) => {
            const aspectRatio = height / width;
            setPosterHeight(win.width * aspectRatio);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        MovieService.getRecommendedMoviesByMovieId(Number(params.id))
          .then((response) => {
            setRecommendedMovies(response.results || []);
          })
          .catch((error) => {
            console.error('Error:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
  }, []);

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" backgroundColor='primaryBg'>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <ScrollView>
      <Box position={'absolute'} width="100%" height={posterHeight}>
        <Image
          source={{ uri: imageUrl + movieData?.poster_path }}
          style={[styles.moviePoster, { height: posterHeight }]}
        />
      </Box>
      <LinearGradient colors={['rgba(0,0,0,0)', '#171719']} style={styles.absoluteFill} />

      <Box flex={1} backgroundColor="primaryBg" alignItems="center" style={styles.mainContainer}>
        <Text variant="title" color="white" textAlign="center" style={styles.title} fontSize={20}>
          {movieData?.original_title}
        </Text>
        <Box
          marginTop="m_16"
          maxWidth="90%"
          style={styles.subInfo}
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap">
          <Text variant="subInfo" color="lightGray" textAlign="center">
            {movieData?.release_date?.split('-')[0]} •
          </Text>
          <Text variant="subInfo" color="lightGray" textAlign="center">
            {' '}
            {movieData?.genres?.map((genre) => genre.name).join('-')}{' '}
          </Text>
          <Text variant="subInfo" color="lightGray" textAlign="center">
            • {Math.trunc((movieData?.runtime ?? 0) / 60)}h{(movieData?.runtime ?? 0) % 60}min
          </Text>
        </Box>
        <Text color="orange" textAlign="center" fontSize={14} marginVertical="m_16">
          {rating} {((movieData?.vote_average ?? 0) / 2).toFixed(2)}
        </Text>
        <Text color="lightGray" textAlign="center" fontSize={15} style={styles.infoFont}>
          {movieData?.overview}
        </Text>
        <Box width={'90%'} height={2} backgroundColor="darkGray" margin="l_32" borderRadius="m_6" />
        <MovieCarousel
          movies={recommendedMovies}
          title="Recommended Movies"
          containerStyle={{ flex: 1, marginLeft: 24 }}
        />
      </Box>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  moviePoster: {
    width: '100%',
    resizeMode: 'cover',
  },
  absoluteFill: {
    width: '100%',
    height: 540,
  },
  mainContainer: {
    paddingBottom: 30,
  },
  title: {
    width: '100%',
    fontFamily: 'Open Sans',
  },
  subInfo: {
    width: '100%',
    fontWeight: 'ultralight',
  },
  infoFont: {
    maxWidth: '90%',
  },
});

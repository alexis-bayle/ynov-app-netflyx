import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Platform, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import { Box, Text } from '~/theme';
import { MovieService } from './_core/service/movieService';
import { Movie } from './_core/interface/movieInterface';
import { LinearGradient } from 'expo-linear-gradient';
import { position } from '@shopify/restyle';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function Modal() {
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<Movie>();
  const [rating, setRating] = useState('');

  const imageUrl = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    MovieService.getMovieDetails(2323)
      .then((response) => {
        console.log(response);
        setMovieData(response);
        setRating(getStarRating(response?.vote_average, 5));
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function getStarRating(rating: number, maxStars = 5) {
    rating = rating / 2; // Divide by 2 to get 5 star rating
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 >= 0.5 ? 1 : 0;
    let emptyStars = maxStars - fullStars - halfStar;

    let stars = [];

    for (let i = 0; i < fullStars; i++) stars.push('★'); // Full stars
    if (halfStar) stars.push('☆'); // Half star
    for (let i = 0; i < emptyStars; i++) stars.push('☆'); // Empty stars

    return stars.join('');
  }

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <ScrollView>
      <Box flex={1} position={'absolute'} top={0} left={0} right={0} aspectRatio={390 / 422}>
        <Image source={{ uri: imageUrl + movieData?.poster_path }} style={styles.moviePoster} />
      </Box>
      <LinearGradient colors={['rgba(0,0,0,0)', '#171719']} style={styles.absoluteFill} />

      <Box flex={1} backgroundColor="primaryBg" alignItems="center" style={styles.mainContainer}>
        <Text variant="title" color="white" textAlign="center" style={styles.title}>
          {movieData?.original_title}
        </Text>
        <Box marginVertical="l_32" width="100%" style={styles.subInfo}>
          <Text color="white" textAlign="center" fontSize={16}>
            {movieData?.release_date.split('-')[0]} •{' '}
            {movieData?.genres?.map((genre) => genre.name).join(', ')} • {movieData?.runtime}min
          </Text>
        </Box>
        <Text color="orange" textAlign="center" fontSize={16}>
          {rating}
        </Text>
        <Text color="white" textAlign="center" fontSize={16}>
          {movieData?.overview}
        </Text>
      </Box>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  moviePoster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // aspectRatio: 1,
  },
  absoluteFill: {
    width: '100%',
    height: 500,
  },
  mainContainer: {
    marginTop: 0,
    height: 500,
  },
  title: {
    width: '100%',
  },
  subInfo: {
    width: '100%',
  },
});

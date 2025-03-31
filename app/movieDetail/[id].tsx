import { Dimensions, Image, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Box, Text, theme } from '~/theme';
import { MovieService } from '../_core/service/movieService';
import { Cast, Movie } from '../_core/interface/movieInterface';
import { LinearGradient } from 'expo-linear-gradient';
import { getRandomInt, getStarRating, imageUrl } from '../_core/helpers/helper';
import MovieCarousel from '~/components/MovieCarousel';
import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import BackButton from '~/components/BackButton';
import MenuButton from '~/components/MenuButton';
import PlayButton from '~/components/PlayButton';
import ActorCarousel from '~/components/ActorCarousel';

const win = Dimensions.get('window');

export default function MovieDetail() {
  const [image, setImage] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<Movie>();
  const [cast, setCast] = useState<Cast[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [rating, setRating] = useState('');
  const [posterHeight, setPosterHeight] = useState(win.height * 0.6); // Default height
  const params = useLocalSearchParams();
  const router = useRouter();

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  function getData() {
    MovieService.getMovieDetails(Number(params.id))
      .then((response) => {
        setMovieData(response);
        setRating(getStarRating(response?.vote_average, 5));
        if (response?.poster_path) {
          Image.prefetch(imageUrl + response?.poster_path)
            .then((res) => {
              console.log('waza', res);
              setImage(res);
            })
            .catch((err) => {
              console.error(err);
              setImage(false);
            });
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
          });

        MovieService.getMovieCreditsByMovieId(Number(params.id))
          .then((response) => {
            setCast(response.cast || []);
          })
          .catch((error) => {
            console.error('Error:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="black">
        <Text color="white" variant="title">
          Loading...
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        style={{ backgroundColor: theme.colors.black }}>
        <Box position={'absolute'} width="100%" height={posterHeight}>
          <BackButton />
          <MenuButton
            onPress={() => {
              console.log('menu');
              router.navigate('/');
            }}
          />
          <Image
            // source={{ uri: imageUrl + movieData?.poster_path }}
            source={
              image !== true
                ? require('assets/noMovies.png')
                : { uri: imageUrl + movieData?.poster_path }
            }
            style={[styles.moviePoster, { height: posterHeight }]}
          />
        </Box>
        <LinearGradient colors={['rgba(0,0,0,0)', '#171719']} style={styles.absoluteFill} />

        <Box flex={1} backgroundColor="primaryBg" alignItems="center" style={styles.mainContainer}>
          <PlayButton
            onPress={() => {
              console.log('play');
            }}
          />
          <Text variant="title" color="white" textAlign="center" style={styles.title} fontSize={20}>
            {movieData?.title}
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
          <Box
            width={'90%'}
            height={2}
            backgroundColor="darkGray"
            margin="l_32"
            borderRadius="m_6"
          />
          <ActorCarousel
            actors={cast.filter((cast) => cast.known_for_department === 'Acting')}
            title="Cast"
            containerStyle={{ flex: 1 }}
          />
          <Box
            width={'90%'}
            height={2}
            backgroundColor="darkGray"
            margin="l_32"
            borderRadius="m_6"
          />
          <MovieCarousel
            movies={recommendedMovies}
            title="Recommended Movies"
            containerStyle={{ flex: 1 }}
          />
        </Box>
      </ScrollView>
    </>
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

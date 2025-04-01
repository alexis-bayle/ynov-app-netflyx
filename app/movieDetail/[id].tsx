import { Dimensions, Image, Linking, RefreshControl, ScrollView, StyleSheet } from 'react-native';
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
import Content from '~/components/detail/content';
import SkeletonContent from '~/components/detail/skeleton';

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

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  function getData() {
    MovieService.getMovieDetails(Number(params.id))
      .then((response) => {
        setMovieData(response);
        setRating(getStarRating(response?.vote_average, 5));
        if (response?.poster_path) {
          Image.prefetch(imageUrl + response?.poster_path)
            .then((res) => {
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

  function handlePlayClicked() {
    const url = `https://www.google.com/search?q=watch+${movieData?.title}`;
    Linking.openURL(url);
  }

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SkeletonContent />
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Content
        isLoading={isLoading}
        onRefresh={onRefresh}
        movieData={movieData}
        cast={cast}
        recommendedMovies={recommendedMovies}
        rating={rating}
        posterHeight={posterHeight}
        imageUrl={imageUrl}
        image={image}
        handlePlayClicked={handlePlayClicked}
      />
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

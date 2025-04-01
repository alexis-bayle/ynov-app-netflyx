import { Dimensions, Linking, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getStarRating, imageUrl } from '../_core/helpers/helper';
import { Stack, useLocalSearchParams } from 'expo-router';
import Content from '~/components/detail/content';
import SkeletonContent from '~/components/detail/skeleton';
import {
  useGetCreditsByMovieId,
  useGetMovieById,
  useGetRecommendedMoviesByMovieId,
} from '../_core/query/hooks/movieHooks';
import { getSize, prefetchImages } from '../_core/helpers/image';

const win = Dimensions.get('window');

export default function MovieDetail() {
  const [image, setImage] = useState<boolean | undefined>(undefined);
  const [posterHeight, setPosterHeight] = useState(win.height * 0.6); // Default height
  const params = useLocalSearchParams();

  const {
    data: movieData,
    isLoading: isMovieLoading,
    refetch: onMovieRefresh,
    isRefetching: isMovieRefetching,
    isError: isMovieError,
  } = useGetMovieById(Number(params.id));
  const {
    data: recommendedMovies,
    isLoading: isRecommendedMoviesLoading,
    refetch: onRecommendedMoviesRefetch,
  } = useGetRecommendedMoviesByMovieId(Number(params.id));
  const {
    data: credits,
    isLoading: isCreditLoading,
    refetch: onCreditsRefetch,
  } = useGetCreditsByMovieId(Number(params.id));

  const rating = movieData?.vote_average ? getStarRating(movieData?.vote_average, 5) : undefined;

  const onRefresh = () => {
    onMovieRefresh();
    onCreditsRefetch();
    onRecommendedMoviesRefetch();
  };

  useEffect(() => {
    setPosterHeight(getSize(win, imageUrl, movieData?.poster_path));
    prefetchImages(imageUrl, movieData?.poster_path).then((image) => setImage(image));
  }, [isMovieLoading, isCreditLoading, isRecommendedMoviesLoading]);

  function handlePlayClicked() {
    const url = `https://www.google.com/search?q=watch+${movieData?.title}`;
    Linking.openURL(url);
  }

  if (isMovieLoading || isCreditLoading || isRecommendedMoviesLoading) {
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
        isLoading={isMovieRefetching}
        onRefresh={onRefresh}
        movieData={movieData}
        cast={credits.cast}
        recommendedMovies={recommendedMovies.results}
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

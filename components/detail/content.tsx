import { Image, RefreshControl, ScrollView, StyleSheet, Vibration } from 'react-native';
import { Box, Text, theme } from '~/theme';
import BackButton from '../BackButton';
import MenuButton from '../MenuButton';
import { LinearGradient } from 'expo-linear-gradient';
import PlayButton from '../PlayButton';
import ActorCarousel from '../ActorCarousel';
import MovieCarousel from '../MovieCarousel';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Cast, Movie } from '~/app/_core/interface/movieInterface';

interface ContentProps {
  isLoading: boolean;
  onRefresh: () => void;
  movieData: Movie | undefined;
  cast: Cast[];
  recommendedMovies: Movie[];
  rating: any;
  posterHeight: any;
  imageUrl: any;
  image: any;
  handlePlayClicked: () => void;
}

export default function Content({
  isLoading,
  onRefresh,
  movieData = {} as Movie,
  cast,
  recommendedMovies,
  rating,
  posterHeight,
  imageUrl,
  image,
  handlePlayClicked,
}: Readonly<ContentProps>) {
  const router = useRouter();

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
      style={{ backgroundColor: theme.colors.black }}>
      <Box position={'absolute'} width="100%" height={posterHeight}>
        <BackButton />
        <MenuButton
          onPress={() => {
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
            Vibration.vibrate(100);
            handlePlayClicked();
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
        <Box width={'90%'} height={2} backgroundColor="darkGray" margin="l_32" borderRadius="m_6" />
        <ActorCarousel
          actors={cast.filter((cast) => cast.known_for_department === 'Acting')}
          title="Cast"
          containerStyle={{ flex: 1 }}
        />
        <Box width={'90%'} height={2} backgroundColor="darkGray" margin="l_32" borderRadius="m_6" />
        <MovieCarousel
          movies={recommendedMovies}
          title="Recommended Movies"
          containerStyle={{ flex: 1 }}
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

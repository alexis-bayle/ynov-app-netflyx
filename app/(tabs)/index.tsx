import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack, useRouter } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SearchInput } from '~/components/home/SearchInput';
import MovieCarousel from '~/components/MovieCarousel';
import {
  useGetMoviesBySearch,
  useGetNewMovies,
  useGetPopularMovies,
} from '../_core/query/hooks/movieHooks';

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [redirectToOnboarding, setRedirectToOnboarding] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const {
    data: newMovies,
    isLoading: isNewMoviesLoading,
    refetch: onNewMoviesRefetch,
  } = useGetNewMovies();
  const {
    data: popularMovies,
    isLoading: isPopularMoviesLoading,
    refetch: onPopularMoviesRefetch,
  } = useGetPopularMovies();
  const {
    data: searchMovies,
    refetch: onSearchRefetch,
    isLoading: isSearchMoviesLoading,
  } = useGetMoviesBySearch(searchInput, 1);

  const onRefresh = useCallback(() => {
    onNewMoviesRefetch();
    onPopularMoviesRefetch();
    onSearchRefetch();
  }, []);

  const isLoading = isNewMoviesLoading || isPopularMoviesLoading || isSearchMoviesLoading;
  const router = useRouter();

  useEffect(() => {
    onSearchRefetch();
  }, [searchInput]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboarded = await AsyncStorage.getItem('isOnboarded');
        setIsOnboarded(onboarded === 'true');
      } catch (error) {
        console.error("Erreur lors de la récupération de l'onboarding :", error);
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (isOnboarded === null) return;

    if (isOnboarded === false) {
      setRedirectToOnboarding(true);
    } else {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');
    }
  }, [isOnboarded]);

  if (redirectToOnboarding) {
    return <Redirect href="/onboarding" />; // Affiche la redirection si nécessaire
  }

  if (
    isNewMoviesLoading ||
    isPopularMoviesLoading ||
    isOnboarded === null ||
    redirectToOnboarding
  ) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View style={styles.container}>
        <ImageBackground
          source={require('assets/home-background1.png')}
          style={styles.backgroundImage}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
          <View style={styles.parent}>
            <Text style={styles.title}>What would you like to watch?</Text>
            <SearchInput
              setInput={(value) => {
                setSearchInput(value);
                onSearchRefetch();
              }}
              containerStyle={{ alignSelf: 'center' }}
            />
            {searchInput === '' ? (
              <>
                <MovieCarousel
                  movies={newMovies.results}
                  title="New Movies"
                  loading={isLoading}
                  containerStyle={{ marginTop: 32 }}
                />
                <MovieCarousel
                  movies={popularMovies.results}
                  title="Popular Movies"
                  loading={isLoading}
                  containerStyle={{ marginTop: 32 }}
                />
              </>
            ) : (
              <>
                {!isSearchMoviesLoading && (
                  <MovieCarousel
                    movies={searchMovies.results}
                    loading={isLoading}
                    title="Results"
                    containerStyle={{ marginTop: 32 }}
                  />
                )}
                {isSearchMoviesLoading && (
                  <MovieCarousel
                    loading={isLoading}
                    title="Results"
                    containerStyle={{ marginTop: 32 }}
                  />
                )}
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/MoviesScreen',
                      params: { search: searchInput },
                    })
                  }>
                  <Text style={styles.text}>Show more</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  parent: {
    flex: 1,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    margin: '10%',
    marginBottom: 32,
    lineHeight: 36,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
    textAlign: 'right',
    marginRight: 18,
    marginTop: 12,
    marginBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

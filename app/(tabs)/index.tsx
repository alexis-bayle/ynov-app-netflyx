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
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SearchInput } from '~/components/home/SearchInput';
import { MovieService } from '../_core/service/movieService';
import MovieCarousel from '~/components/MovieCarousel';
import MovieCarouselSkeleton from '~/components/MovieCarouselSkeleton';

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [newMovies, setNewMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirectToOnboarding, setRedirectToOnboarding] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const onRefresh = useCallback(() => {
    setLoading(true);
    if (searchInput === '') {
      MovieService.getNewMovies().then((response) => {
        setNewMovies(response.results || []);
      });

      MovieService.getPopulardMovies().then((response) => {
        setPopularMovies(response.results || []);
      });
    } else {
      MovieService.getMoviesBySearch(searchInput, 1).then((response) => {
        setSearchMovies(response.results || []);
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboarded = await AsyncStorage.getItem('isOnboarded');
        setIsOnboarded(onboarded === 'true');
      } catch (error) {
        console.error("Erreur lors de la récupération de l'onboarding :", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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

      MovieService.getNewMovies().then((response) => {
        setNewMovies(response.results || []);
      });

      MovieService.getPopulardMovies().then((response) => {
        setPopularMovies(response.results || []);
      });
    }
  }, [isOnboarded]);

  useEffect(() => {
    if (searchInput === '') return;

    MovieService.getMoviesBySearch(searchInput, 1).then((response) => {
      setSearchMovies(response.results || []);
    });
  }, [searchInput]);

  if (redirectToOnboarding) {
    return <Redirect href="/onboarding" />; // Affiche la redirection si nécessaire
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
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
          <View style={styles.parent}>
            <Text style={styles.title}>What would you like to watch?</Text>
            <SearchInput setInput={setSearchInput} containerStyle={{ alignSelf: 'center' }} />
            {searchInput === '' ? (
              <>
                {loading ? (
                  <>
                    <MovieCarouselSkeleton title="New Movies" containerStyle={{ marginTop: 32 }} />
                    <MovieCarouselSkeleton
                      title="Popular Movies"
                      containerStyle={{ marginTop: 32 }}
                    />
                  </>
                ) : (
                  <>
                    <MovieCarousel
                      movies={newMovies}
                      title="New Movies"
                      containerStyle={{ marginTop: 32 }}
                    />
                    <MovieCarousel
                      movies={popularMovies}
                      title="Popular Movies"
                      containerStyle={{ marginTop: 32 }}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <MovieCarousel
                  movies={searchMovies}
                  title="Results"
                  containerStyle={{ marginTop: 32 }}
                />
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

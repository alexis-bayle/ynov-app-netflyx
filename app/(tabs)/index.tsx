import { Link, Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SearchInput } from '~/components/home/SearchInput';
import { MovieService } from '../_core/service/movieService';
import MovieCarousel from '~/components/MovieCarousel';
import React from 'react';

export default function Home() {
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');

    MovieService.getNewMovies().then((response) => {
      setNewMovies(response.results || []);
    });
    MovieService.getPopulardMovies().then((response) => {
      setPopularMovies(response.results || []);
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View style={styles.container}>
        <ImageBackground
          source={require('assets/home-background1.png')}
          style={styles.backgroundImage}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.parent}>
            <Text style={styles.title}>What would you like to watch?</Text>
            <SearchInput containerStyle={{ alignSelf: 'center' }} />
            <MovieCarousel
              movies={newMovies}
              title="New Movies"
              containerStyle={{ marginTop: 32, paddingRight: 0 }}
            />
            <MovieCarousel
              movies={popularMovies}
              title="Popular Movies"
              containerStyle={{ marginTop: 32, paddingRight: 0 }}
            />
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
    padding: 24,
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
  },
});

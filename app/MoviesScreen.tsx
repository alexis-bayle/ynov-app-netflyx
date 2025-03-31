import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from "react";
import { MovieService } from '~/app/_core/service/movieService';
import MoviesVertical from '~/components/MoviesVertical';
import { Movie } from '~/app/_core/interface/movieInterface';

export default function MoviesScreen() {
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const params = useLocalSearchParams();
  const search: string = Array.isArray(params.search) ? params.search[0] : params.search;

  useEffect(() => {
    MovieService.getMoviesBySearch(search, 1).then((response) => {
      setSearchMovies(response.results || []);
    });
  }, []);

  useEffect(() => {
    MovieService.getMoviesBySearch(search, page).then((response) => {
      setSearchMovies([...searchMovies, ...response.results]);
    });
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      MovieService.getMoviesBySearch(search, 1).then((response) => {
        setSearchMovies(response.results || []);
      });
    }, [search])
  );

  return (
    <>
      <Stack.Screen
        options={{ title: 'Results', headerShown: true, headerBackButtonDisplayMode: 'default',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
      }}
      />
      <View style={styles.container}>
        <ImageBackground
          source={require('assets/home-background1.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.parent}>
          <MoviesVertical
            movies={searchMovies}
            title="Results"
            containerStyle={{ marginTop: 0 }}
            page={page}
            setPage={setPage}
          />
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

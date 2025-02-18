import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import {useEffect} from "react";
import { SearchInput } from "~/components/home/SearchInput";
import { NewMovies } from "~/components/home/NewMovies";

export default function Home() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View style={styles.parent}>
        <Image
          source={require('assets/home-background.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>What would you like to watch?</Text>
          </View>

          <View style={styles.searchContainer}>
            <SearchInput />
          </View>
        </View>
        <View style={styles.newMoviesContainer}>
          <NewMovies />
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#171719',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // position absolute, top: 0, left: 0, bottom: 0, right: 0
    zIndex: 1, // se place au-dessus du background
  },
  content: {
    padding: 24,
    zIndex: 2, // le contenu se superpose à l'image
  },
  titleSection: {
    alignItems: 'center',
    marginTop: '20%',
    marginLeft: '20%',
    marginRight: '20%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 36,
  },
  searchContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  newMoviesContainer: {
    marginTop: 32,
    paddingRight: 0,
  },
});

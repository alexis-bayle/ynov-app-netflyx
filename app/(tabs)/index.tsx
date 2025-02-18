import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, View, Image } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import {useEffect} from "react";

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
          <ScreenContent path="app/(tabs)/index.tsx" title="Home" />
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
    flex: 1,
    padding: 24,
    zIndex: 2, // le contenu se superpose à l'image
  },
});

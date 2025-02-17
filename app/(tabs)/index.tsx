import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import {useEffect} from "react";

export default function Home() {
    useEffect(() => {

        NavigationBar.setVisibilityAsync('hidden');
        // Pour un mode immersif complet (ex: swipes pour revenir)
        NavigationBar.setBehaviorAsync('overlay-swipe');
    }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Home" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

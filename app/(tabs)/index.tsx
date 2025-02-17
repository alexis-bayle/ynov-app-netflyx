import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import {useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <LinearGradient
        colors={['#0B9E9F', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}>

        <View style={styles.container}>
          <ScreenContent path="app/(tabs)/index.tsx" title="Home" />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  linearGradient: {
    flex: 1,
  },
});

import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Movies' }} />
      <ScreenContent path="app/(tabs)/Movies.tsx" title="Movies" />
    </>
  );
}

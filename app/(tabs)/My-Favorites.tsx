import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'My-Favorites' }} />
      <ScreenContent path="app/(tabs)/My-Favorites.tsx" title="My-Favorites" />
    </>
  );
}

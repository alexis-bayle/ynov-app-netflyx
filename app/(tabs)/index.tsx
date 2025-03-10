import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem('isOnboarded');
      setIsOnboarded(onboarded === 'true');
    };
    checkOnboarding();
  }, []);

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
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

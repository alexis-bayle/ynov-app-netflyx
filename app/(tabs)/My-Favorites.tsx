import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'My-Favorites' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/My-Favorites.tsx" title="My-Favorites" />
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

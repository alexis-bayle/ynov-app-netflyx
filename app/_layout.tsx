import { ThemeProvider } from '@shopify/restyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from 'theme';
import { queryClient } from './_core/helpers/hooks';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Open-Sans': require('assets/fonts/OpenSans-VariableFont.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StatusBar translucent backgroundColor="transparent" style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
            contentStyle: { backgroundColor: 'black' },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

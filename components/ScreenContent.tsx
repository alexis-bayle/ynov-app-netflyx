import { Box, Text } from 'theme';
import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('assets/home-background1.png')}
        style={styles.backgroundImage}
      />

      <Box style={styles.contentContainer}>
        <Text variant="large" color="white">
          Sorry !
        </Text>
        <Image source={require('assets/wip.png')} style={styles.searchIcon} />
        <Text
          variant="subInfo"
          color="white"
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          The page "
          <Text variant="title" color="white">
            {title}
          </Text>
          " is still work in progress
        </Text>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 325,
    height: 325,
    resizeMode: 'contain',
  },
});

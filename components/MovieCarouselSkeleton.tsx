import React from 'react';
import { Box, Text } from '~/theme';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import SkeletonMovieCard from './SkeletonMovieCard';

export default function MovieCarouselSkeleton({
  title,
  containerStyle = {},
}: Readonly<{
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
}>) {
  const placeholderData = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Box style={[containerStyle, styles.container]}>
      <Text variant="title" color="white" style={styles.title}>
        {title}
      </Text>

      <View style={styles.carouselContainer}>
        <FlatList
          data={placeholderData}
          horizontal
          maxToRenderPerBatch={2}
          renderItem={({ item }) => <SkeletonMovieCard key={item} />}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 16,
          }}
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginLeft: 16,
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

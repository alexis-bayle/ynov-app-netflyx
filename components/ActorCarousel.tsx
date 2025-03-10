import { Box, Text } from '~/theme';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import ActorCard from './ActorCard';
import { Cast } from '~/app/_core/interface/movieInterface';

export default function ActorCarousel({
  actors = [],
  title,
  containerStyle = {},
}: Readonly<{ actors: Cast[]; title: string; containerStyle?: StyleProp<ViewStyle> }>) {
  return (
    <Box style={[containerStyle, actors.length === 0 ? styles.container : {}]}>
      <Text variant="title" color="white">
        {title}
      </Text>
      <View id="carousel-component" style={styles.carouselContainer}>
        {actors.length > 0 && (
          <FlatList
            data={actors}
            renderItem={({ item, index }) => <ActorCard key={index} actor={item} />}
            horizontal
            contentContainerStyle={{
              gap: 16,
            }}
          />
        )}
        {actors.length === 0 && (
          <Text variant="body" color="white" style={styles.noActors}>
            No actors found
          </Text>
        )}
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: 50,
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
    width: '100%',
  },
  noActors: {
    width: '100%',
    marginLeft: 16,
  },
});

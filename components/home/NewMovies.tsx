import { makeStyles } from '~/theme';
import { Text, View, Image, FlatList, ScrollView } from 'react-native';

export const NewMovies = () => {
  const styles = useStyles();

  const DATA = [
    {
      id: 'bd7acbega-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      image: 'https://image.tmdb.org/t/p/original/du716YH0PKiL2kZgIPLkEblgHLX.jpg',
    },
    {
      id: 'bdf7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      image: 'https://image.tmdb.org/t/p/original/ojDg0PGvs6R9xYFodRct2kdI6wC.jpg',
    },
    {
      id: 'bd7acbea-cz1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      image: 'https://image.tmdb.org/t/p/original/9rsivF4sWfmBzrNr4LPu6TNJhXX.jpg',
    },
    {
      id: 'bd7agcbea-cz1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      image: 'https://image.tmdb.org/t/p/original/m5HSlaNCzwV95rAriDmT19el5h1.jpg',
    },
    {
      id: 'bd7acbea-cz1b1-46c2-aed5-3ad53ahbb28ba',
      title: 'First Item',
      image: 'https://image.tmdb.org/t/p/original/pyCk5JgtRZwRxnXwfrvyzukaKue.jpg',
    },
    {
      id: 'bd7achbea-cz1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      image: 'https://image.tmdb.org/t/p/original/pyCk5JgtRZwRxnXwfrvyzukaKue.jpg',
    },
  ];


  type ItemProps = {title: string, image: string};

  const Item = ({title, image}: ItemProps) => (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.cover} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New movies</Text>
      <View style={styles.moviesContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} image={item.image} />}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 16,
          }}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {

  },
  title: {
    paddingLeft: 24,
    fontSize: 20,
    color: 'white',
  },
  moviesContainer: {
    marginTop: 8,
  },
  item: {

  },
  cover: {
    width: 120, // définir une largeur
    height: 180, // définir une hauteur
    borderRadius: theme.borderRadii.xl_24,
  }
}));

import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Vibration } from 'react-native';
import { imageUrl } from '~/app/_core/helpers/helper';
import { Cast } from '~/app/_core/interface/movieInterface';
export default function ActorCard({ actor }: Readonly<{ actor: Cast }>) {
  const [image, setImage] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    Image.prefetch(imageUrl + actor?.profile_path)
      .then((res) => {
        setImage(res);
      })
      .catch((err) => {
        setImage(false);
      });
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Vibration.vibrate(100);
      }}>
      <Image
        source={
          image !== true
            ? require('assets/impersonalCast.png')
            : { uri: imageUrl + actor?.profile_path }
        }
        defaultSource={require('assets/impersonalCast.png')}
        style={styles.image}
      />
      <Text style={styles.name}>{actor.name}</Text>
      <Text style={styles.character}>{actor.character}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  character: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

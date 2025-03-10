import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PlayButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={require('assets/play-button.png')} width={1} height={1} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: -50,
    right: 30,
    zIndex: 100,
  },
});

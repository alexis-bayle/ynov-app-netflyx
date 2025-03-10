import { MaterialIcons } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity } from 'react-native';

export default function MenuButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialIcons name="menu" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    right: 20,
    zIndex: 100,
  },
});

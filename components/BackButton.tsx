import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function BackButton() {
  const router = useRouter();

  const onPress = () => {
    router.back();
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons name="arrow-left" size={27} color="white" />
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
    left: 20,
    zIndex: 100,
  },
});

import { Text } from '~/theme';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { HorizontalSliderItemProps } from '~/app/_core/interface/horizontal-slider-item-props';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HorizontalSliderItem({
  id,
  image,
  title,
  body,
  signUp,
  letsGo,
}: HorizontalSliderItemProps) {
  const router = useRouter();

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('isOnboarded', 'true');
      router.replace('/');
      console.log('Onboarding terminé, redirection vers /...');
    } catch (error) {
      console.error("Erreur lors de la completion de l'onboarding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={getImageStyleById(id)} source={image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{body}</Text>
      {signUp && (
        <TouchableOpacity>
          <Image style={styles.button} source={require('assets/onboarding/sign_up.png')} />
        </TouchableOpacity>
      )}
      {letsGo && (
        <TouchableOpacity onPress={completeOnboarding}>
          <Image style={styles.button} source={require('assets/onboarding/lets_go.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function getImageStyleById(id: number) {
  switch (id) {
    case 0:
      return {
        marginLeft: 15,
        marginTop: 30,
        width: 320,
        height: 320,
        marginBottom: 25,
      };
    case 1:
      return {
        marginTop: 30,
        width: 350,
        height: 350,
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 25,
      };
    default:
      return {
        marginLeft: 15,
        marginTop: 30,
        width: 320,
        height: 320,
        marginBottom: 25,
      };
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    maxWidth: '80%',
    marginBottom: 20,
    marginLeft: 15,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    maxWidth: '60%',
    marginLeft: 55,
  },
  image: {
    marginLeft: 15,
    marginTop: 30,
    width: 320,
    height: 320,
    marginBottom: 25,
  },
  button: {
    marginLeft: 35,
  },
});

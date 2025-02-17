import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            // On place la barre en "position absolute" pour pouvoir arrondir, etc.
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'transparent', // Important si on met un gradient derrière
                borderTopWidth: 0,
                // Hauteur plus grande pour accueillir le bouton central
                height: 70,

                //justifyContent: 'center',
                //alignItems: 'center',
                //marginTop: 20,
            },
          tabBarItemStyle: {
              flex: 1,
            marginTop: 12,
            alignItems: 'center',
          },
            // On applique notre dégradé de fond
          tabBarBackground: () => (
            <View style={{ flex: 1 }}>
              {/* Dégradé en arrière-plan */}
              <LinearGradient
                colors={['#0B9E9F', '#0A0A0A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
              {/* Blur par-dessus (tu peux jouer sur tint / intensity) */}
              <BlurView tint="dark" intensity={25} style={StyleSheet.absoluteFill} />
            </View>
          ),
            tabBarActiveTintColor: '#fff',
            tabBarShowLabel: false, // si on veut uniquement des icônes
        }}
        >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Movies"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => <TabBarIcon name="youtube-play" color={color} />,
        }}
      />
      <Tabs.Screen
        name="New"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => {
            const SIZE = 54; // Taille du cercle intérieur (pour l'image)
            const BORDER_WIDTH = 3;
            const OUTER_SIZE = SIZE + BORDER_WIDTH * 2; // Taille totale avec border

            return (
                <View
                  style={{
                    width: SIZE,
                    height: SIZE,
                    borderRadius: SIZE / 2,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 28,
                  }}
                >
                  <Image
                    source={require('../../assets/plus-bottom-bar.png')}
                    style={{
                      width: SIZE * 2.5, // Ajustez si besoin
                      height: SIZE * 2.5,
                    }}
                  />
                </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="My-Favorites"
        options={{
          title: 'My-Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="folder" color={color} />,
        }}
      />
      <Tabs.Screen
        name="My-Download"
        options={{
          title: 'My-Download',
          tabBarIcon: ({ color }) => <TabBarIcon name="arrow-circle-down" color={color} />,
        }}
      />
    </Tabs>
  );
}

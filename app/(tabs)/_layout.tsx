import { backgroundColor } from '@shopify/restyle';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack, Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TabBarIconSvg } from '~/components/TabBarIconSvg';

export default function TabLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,
            height: 70,
            bottom: 0,
          },
          tabBarItemStyle: {
            flex: 1,
            marginTop: 12,
            alignItems: 'center',
          },
          // On applique notre dégradé de fond
          tabBarBackground: () => (
            <View style={StyleSheet.absoluteFillObject}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: 'rgba(255, 255, 255)',
                  zIndex: 2,
                }}
              />
              <BlurView
                intensity={30}
                experimentalBlurMethod={'dimezisBlurView'}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          ),
          tabBarActiveTintColor: '#fff',
          tabBarShowLabel: false, // si on veut uniquement des icônes
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIconSvg name="home" color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Movies"
          options={{
            title: 'Movies',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIconSvg name="play" color={color} />,
          }}
        />
        <Tabs.Screen
          name="New"
          options={{
            title: 'New',
            headerShown: false,

            tabBarIcon: ({ color }) => {
              const SIZE = 54; // Taille du cercle intérieur (pour l'image)
              const BORDER_WIDTH = 3;
              const OUTER_SIZE = SIZE + BORDER_WIDTH * 2; // Taille totale avec border

              return (
                <LinearGradient
                  colors={['#0B9E9F', '#0A0A0A']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: SIZE,
                    marginBottom: 28,
                    height: SIZE,
                    borderRadius: SIZE / 2,
                  }}>
                  <View
                    style={{
                      width: SIZE,
                      height: SIZE,
                      borderRadius: SIZE / 2,
                      overflow: 'hidden',
                      position: 'absolute',
                    }}>
                    <BlurView
                      tint="dark"
                      intensity={80}
                      style={{
                        width: SIZE,
                        height: SIZE,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: SIZE,
                      height: SIZE,
                      borderRadius: SIZE / 2,
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assets/plus-bottom-bar.png')}
                      style={{
                        width: SIZE * 2.5, // Ajustez si besoin
                        height: SIZE * 2.5,
                      }}
                    />
                  </View>
                </LinearGradient>
              );
            },
          }}
        />
        <Tabs.Screen
          name="My-Favorites"
          options={{
            title: 'My-Favorites',
            headerShown: false,

            tabBarIcon: ({ color }) => <TabBarIconSvg name="folder" color={color} />,
          }}
        />
        <Tabs.Screen
          name="My-Download"
          options={{
            title: 'My-Download',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIconSvg name="arrow" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

import { useState } from 'react';
import { Dimensions, ImageBackground, ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native';
import HorizontalSliderItem from './HorizontalSliderItem';
import React from 'react';

interface HorizontalSliderProps {
    slides: {
        id: number;
        image: ImageSourcePropType;
        title: string;
        body: string;
        signUp: boolean;
        letsGo: boolean;
    }[]
}

export default function HorizontalSlider({slides}: HorizontalSliderProps) {
    const { width } = Dimensions.get('window');
    const [slideIndex, setSlideIndex] = useState(0);
    return (
        <>
            <ImageBackground style={styles.background} source={require('assets/onboarding/first_background.png')}/>
            <ScrollView
            horizontal
            pagingEnabled
            style={styles.container}
            onScroll={(event) => {
                const contentOffsetX = event.nativeEvent.contentOffset.x;
                setSlideIndex(Math.round(contentOffsetX / width));
            }}
            scrollEventThrottle={16}
            >
                {slides.map((slide) => (
                        <HorizontalSliderItem key={slide.id} {...slide} />
                ))}
            </ScrollView>
            <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
                <View key={index} style={[styles.dot, slideIndex === index && styles.activeDot]} />
            ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
    },
    background:{
        position: 'absolute',
        width: 400,
        height: 700,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "gray",
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "white",
        width: 16,
    },
});
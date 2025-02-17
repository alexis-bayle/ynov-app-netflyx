import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import HorizontalSliderItem from './HorizontalSliderItem';

export default function HorizontalSlider() {
    const [slideIndex, setSlideIndex] = useState(0);
    return (
        <ScrollView
        horizontal
        pagingEnabled
        style={styles.container}
        onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const slideIndex = Math.round(contentOffsetX / innerWidth);
            setSlideIndex(slideIndex);
        }}>
            <HorizontalSliderItem></HorizontalSliderItem>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
    },
});
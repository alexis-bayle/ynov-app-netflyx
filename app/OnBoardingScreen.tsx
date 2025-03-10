import HorizontalSlider from '~/components/HorizontalSlider';
import { HorizontalSliderItemProps } from '~/app/_core/interface/horizontal-slider-item-props';
import { Box } from '~/theme';

const slides: HorizontalSliderItemProps[] = [
  {
    id: 0,
    image: require('assets/onboarding/first_image.png'),
    title: 'Watch movies in Virtual Reality',
    body: 'Download and watch offline wherever you are',
    signUp: true,
    letsGo: false,
  },
  {
    id: 1,
    image: require('assets/onboarding/second_image.png'),
    title: 'Watch all your favorite action movies',
    body: 'More than 1 000 movies available',
    signUp: false,
    letsGo: false,
  },
  {
    id: 2,
    image: require('assets/onboarding/film-3d-icon.png'),
    title: 'Make yourself comfortable',
    body: 'Watching movies has never been easier',
    signUp: false,
    letsGo: true,
  },
];

export default function OnboardingScreen() {
  return (
    <Box backgroundColor="black" flex={1}>
      <HorizontalSlider slides={slides} />
    </Box>
  );
}

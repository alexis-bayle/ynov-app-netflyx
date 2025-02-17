import HorizontalSlider from "~/components/HorizontalSlider";
import { Box } from "~/theme";

export default function OnboardingScreen() {
    return (
        <Box backgroundColor="black" flex={1}>
            <HorizontalSlider/>
        </Box>
    );
}
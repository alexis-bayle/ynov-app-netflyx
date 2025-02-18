import { ImageSourcePropType } from "react-native";

export interface HorizontalSliderItemProps {
    id: number;
    image: ImageSourcePropType;
    title: string;
    body: string;
    signUp: boolean;
    letsGo: boolean;
}
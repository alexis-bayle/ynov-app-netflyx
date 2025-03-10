import { Stack } from "expo-router";
import React from "react";
import OnboardingScreen from "~/screens/OnBoardingScreen";

export default function Onboarding() {
    return (
        <>
            <Stack.Screen options={{headerShown:false}}/>
            <OnboardingScreen/>
        </>
    );
}
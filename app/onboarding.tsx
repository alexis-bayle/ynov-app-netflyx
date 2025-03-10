import { Stack } from "expo-router";
import React from "react";
import OnboardingScreen from "~/app/OnBoardingScreen";

export default function Onboarding() {
    return (
        <>
            <Stack.Screen options={{headerShown:false}}/>
            <OnboardingScreen/>
        </>
    );
}
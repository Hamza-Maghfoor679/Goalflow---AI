// navigation/types.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardingProp } from "./types/types";

export type RootStackParamList = {
  GoalCategory: undefined;
  Onboarding: { category: string };
  Login: {onboardingPayload: OnboardingProp}; // or null if you're strict
  MainStack: undefined
  // add other screens here
};

export type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

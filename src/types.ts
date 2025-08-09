// navigation/types.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardingProp } from "./types/types";

export type RootStackParamList = {
  Splash: undefined;
  GoalCategory: undefined;
  Onboarding: { category: string, input?: string, age?: string, timeFrame?: string };
  Login: {onboardingPayload: OnboardingProp | null}; 
  MainStack: undefined
};

export type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

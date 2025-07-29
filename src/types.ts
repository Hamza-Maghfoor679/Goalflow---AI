// navigation/types.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  GoalCategory: undefined;
  Onboarding: { category: string };
  Login: undefined; // or null if you're strict
  MainStack: undefined
  // add other screens here
};

export type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

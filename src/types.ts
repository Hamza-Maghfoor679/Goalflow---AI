// navigation/types.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardingProp } from "./types/types";
export type Question = {
  map(arg0: (q: any, index: number) => { question: any; answer: string; }): unknown;
  length: number;
  question: string;
  options: string[];
};

export type RootStackParamList = {
  Splash: undefined;
  GoalCategory: undefined;
  Onboarding: { category: string, input?: string, age?: string, timeFrame?: string, questions: Question };
  Login: {onboardingPayload: OnboardingProp | null}; 
  MainStack: undefined
};

export type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

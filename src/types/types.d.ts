export interface OnboardingProp {
  personality: string;
  trauma: string;
  preferences: string;
  answers: (string | null)[];  // <-- this should be an array
  category: string;
}
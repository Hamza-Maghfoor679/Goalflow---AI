export interface OnboardingProp {
  personality: string;
   input: string | undefined;
  age: string | undefined;
  trauma: string;
  preferences: string;
   answers: {
    question: string;
    answer: string;
  }[];  // <-- this should be an array
  category: string;
 timeFrame?: string; // Optional field for time frame
}
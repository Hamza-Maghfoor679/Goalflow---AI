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

export type Goal = {
  id: string;
  userId: string;
  category?: string; // optional in case it's missing in some goals
  title: string;
  timeframe: string;
  answers: { answer: string; question: string }[];
  startDate?: { _seconds: number; _nanoseconds: number };
  currentDayIndex?: number;
  todaysFocus?: string;
  tipOfTheDay?: string;
  generated?: boolean;
  createdAt?: { _seconds: number; _nanoseconds: number };
  updatedAt?: { _seconds: number; _nanoseconds: number };
  description?: string;
};

export type Question = {
  question: string;
  options: string[];
};
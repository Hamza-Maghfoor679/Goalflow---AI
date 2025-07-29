export type GoalCategory =
  | "career"
  | "fitness"
  | "health"
  | "finance"
  | "spirituality"
  | "relationship"
  | "creativity"
  | "personality";

export const habitQuestionsByCategory: Record<GoalCategory, { question: string; options: string[] }[]> = {
  career: [
    {
      question: 'How do you usually start your workday?',
      options: ['With a plan or checklist', 'Jump into emails or calls', 'Procrastinate a bit', 'It varies each day'],
    },
    {
      question: 'Do you schedule time for focused, deep work?',
      options: ['Yes, regularly', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      question: 'How often do you reflect on your career progress?',
      options: ['Weekly', 'Monthly', 'Occasionally', 'Never'],
    },
    {
      question: 'What’s your biggest work distraction?',
      options: ['Social media', 'Notifications', 'Colleagues', 'Lack of motivation'],
    },
    {
      question: 'How do you track your career growth or achievements?',
      options: ['Journal or log', 'Mental notes', 'Through feedback', 'I don’t'],
    },
    {
      question: 'Do you spend time learning new career skills regularly?',
      options: ['Yes, daily', 'Weekly', 'Rarely', 'Not at all'],
    },
    {
      question: 'How clear are you about your long-term career goals?',
      options: ['Very clear', 'Somewhat clear', 'Not really', 'No idea'],
    },
  ],
  fitness: [
    {
      question: 'How many days per week do you exercise?',
      options: ['0', '1–2', '3–4', '5+'],
    },
    {
      question: 'What kind of workouts do you enjoy?',
      options: ['Cardio', 'Strength training', 'Yoga/flexibility', 'None yet'],
    },
    {
      question: 'Do you track your workouts or progress?',
      options: ['Yes, always', 'Sometimes', 'No, but I want to', 'No, not interested'],
    },
    {
      question: 'What’s your biggest challenge staying active?',
      options: ['Lack of time', 'Low energy', 'Lack of motivation', 'Don’t know where to start'],
    },
    {
      question: 'Do you warm up and cool down in your workouts?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      question: 'Do you stretch or improve flexibility regularly?',
      options: ['Yes, daily', 'Occasionally', 'Rarely', 'Never'],
    },
    {
      question: 'Do you follow a workout plan or routine?',
      options: ['Yes, structured plan', 'Rough routine', 'Random workouts', 'No plan'],
    },
  ],
  health: [
    {
      question: 'How many hours of sleep do you get per night?',
      options: ['<5', '5–6', '7–8', '8+'],
    },
    {
      question: 'How often do you drink water daily?',
      options: ['<2 glasses', '2–4 glasses', '5–7 glasses', '8+ glasses'],
    },
    {
      question: 'Do you eat balanced meals regularly?',
      options: ['Yes', 'Mostly', 'Sometimes', 'Rarely'],
    },
    {
      question: 'How often do you feel low on energy?',
      options: ['Rarely', 'Sometimes', 'Often', 'Almost always'],
    },
    {
      question: 'Do you go for regular health checkups?',
      options: ['Yes', 'Occasionally', 'Rarely', 'Never'],
    },
    {
      question: 'How often do you consume processed or junk food?',
      options: ['Almost never', 'Sometimes', 'Often', 'Daily'],
    },
    {
      question: 'Do you engage in relaxing or destressing activities?',
      options: ['Daily', 'Weekly', 'Rarely', 'Not at all'],
    },
  ],
  finance: [
    {
      question: 'Do you track your spending daily?',
      options: ['Yes', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      question: 'Do you follow a budget?',
      options: ['Strictly', 'Loosely', 'Not really', 'No budget at all'],
    },
    {
      question: 'How often do you review your finances?',
      options: ['Weekly', 'Monthly', 'Occasionally', 'Never'],
    },
    {
      question: 'What’s your biggest financial habit challenge?',
      options: ['Overspending', 'Impulse buying', 'Lack of saving', 'Debt management'],
    },
    {
      question: 'Do you set monthly financial goals?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      question: 'Do you maintain an emergency fund?',
      options: ['Yes', 'Working on it', 'No but planning', 'Not at all'],
    },
    {
      question: 'Do you invest money regularly?',
      options: ['Yes', 'Occasionally', 'Not yet', 'No and not planning'],
    },
  ],
  spirituality: [
    {
      question: 'Do you have a daily spiritual or mindfulness practice?',
      options: ['Yes', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      question: 'How often do you reflect on your inner life?',
      options: ['Daily', 'Weekly', 'Occasionally', 'Rarely'],
    },
    {
      question: 'What spiritual activities ground you most?',
      options: ['Prayer', 'Meditation', 'Nature walks', 'Reading spiritual texts'],
    },
    {
      question: 'What’s your biggest challenge in spiritual consistency?',
      options: ['Distractions', 'Lack of time', 'Lack of motivation', 'Not sure where to start'],
    },
    {
      question: 'Do you practice gratitude regularly?',
      options: ['Yes, daily', 'A few times/week', 'Occasionally', 'Never'],
    },
    {
      question: 'Do you journal or reflect spiritually?',
      options: ['Daily', 'Weekly', 'Rarely', 'Never'],
    },
    {
      question: 'How connected do you feel to something greater than yourself?',
      options: ['Very connected', 'Somewhat', 'Unsure', 'Not at all'],
    },
  ],
  relationship: [
    {
      question: 'How often do you connect with people you care about?',
      options: ['Daily', 'Several times/week', 'Once a week', 'Rarely'],
    },
    {
      question: 'How do you usually connect with others?',
      options: ['In person', 'Text/calls', 'Social media', 'I keep to myself'],
    },
    {
      question: 'What’s your biggest relationship habit challenge?',
      options: ['Lack of time', 'Avoiding vulnerability', 'Poor communication', 'Fear of rejection'],
    },
    {
      question: 'Do you regularly express appreciation to people?',
      options: ['Yes, often', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      question: 'Do you actively listen when talking to someone?',
      options: ['Always', 'Mostly', 'Sometimes', 'Rarely'],
    },
    {
      question: 'Do you make time for quality connection in your week?',
      options: ['Yes, intentionally', 'Sometimes', 'Rarely', 'Not at all'],
    },
    {
      question: 'Do you resolve conflicts in a healthy way?',
      options: ['Yes', 'Trying to', 'Struggle with it', 'Avoid conflicts'],
    },
  ],
  creativity: [
    {
      question: 'How often do you set aside time to create?',
      options: ['Daily', 'A few times a week', 'Occasionally', 'Rarely'],
    },
    {
      question: 'Where do you capture your creative ideas?',
      options: ['Notebook/journal', 'Phone/computer', 'Memory only', 'I don’t'],
    },
    {
      question: 'What kind of creative expression excites you most?',
      options: ['Writing', 'Art/Design', 'Music', 'Problem-solving'],
    },
    {
      question: 'What usually blocks your creativity?',
      options: ['Perfectionism', 'Distractions', 'Self-doubt', 'Time constraints'],
    },
    {
      question: 'Do you share your creative work with others?',
      options: ['Yes, often', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      question: 'Do you explore or learn from other creative people?',
      options: ['Regularly', 'Occasionally', 'Rarely', 'Not at all'],
    },
    {
      question: 'Do you have a dedicated space or routine for creativity?',
      options: ['Yes', 'Sort of', 'No, but I want one', 'Not needed'],
    },
    
  ],
  personality: [ 
    {
      question: 'How do you typically react to unexpected changes?',
      options: ['Adapt easily', 'Feel a bit stressed, then adapt', 'Find it challenging', 'Resist change'],
    },
    {
      question: 'When making decisions, do you tend to rely on logic or intuition?',
      options: ['Mostly logic', 'Balance of both', 'Mostly intuition', 'It varies greatly'],
    },
    {
      question: 'How do you recharge your energy after social interaction?',
      options: ['By spending time alone', 'By spending more time with people', 'A mix of both', 'I don’t need to recharge'],
    },
    {
      question: 'How do you approach feedback, especially constructive criticism?',
      options: ['Welcome it for growth', 'Listen carefully, then process', 'Can be defensive initially', 'Avoid it if possible'],
    },
    {
      question: 'How do you handle conflict or disagreements?',
      options: ['Address it directly and calmly', 'Try to find a compromise', 'Avoid confrontation', 'Can become emotional'],
    },
    {
      question: 'How often do you step out of your comfort zone?',
      options: ['Regularly', 'Occasionally', 'Rarely', 'Almost never'],
    },
    {
      question: 'How important is routine and structure in your daily life?',
      options: ['Very important, I thrive on it', 'Somewhat important', 'I prefer flexibility', 'Not important at all'],
    },
  ],
};

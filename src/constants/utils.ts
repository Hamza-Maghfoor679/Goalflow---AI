export const goals = [
  { id: '1', title: 'Better Sleep', progress: 40 },
  { id: '2', title: 'Fitness Routine', progress: 20 },
];

export const tasks = [
  { id: '1', title: 'Avoid screens 1 hour before sleep', done: false },
  { id: '2', title: 'Meditate for 10 minutes', done: true },
];


export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export const initialTasks: Task[] = [
  { id: '1', title: '🧘 Morning yoga session – 20 mins', completed: false },
  { id: '2', title: '🥗 Eat a balanced lunch (high protein)', completed: false },
  { id: '3', title: '📝 Reflect for 10 minutes before bed', completed: false },
  { id: '4', title: '🚶 Go for a 30-minute walk', completed: false },
  { id: '5', title: '📚 Read a book for 15 minutes', completed: false },
  { id: '6', title: '💧 Drink 8 glasses of water', completed: false },
  { id: '7', title: '📧 Clear your email inbox', completed: false },
  { id: '8', title: '📞 Call a friend or family member', completed: false },
  { id: '9', title: '🧹 Tidy up your workspace', completed: false },
  { id: '10', title: '💡 Learn something new for 20 minutes', completed: false },
  { id: '11', title: '🍎 Prepare healthy snacks for tomorrow', completed: false },
];
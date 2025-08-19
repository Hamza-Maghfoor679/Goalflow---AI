import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../types/types';

export interface GoalData {
  goals: Goal[];
  goalIds: string[];
}

const initialState: GoalData = {
  goals: [],
  goalIds: [],
}

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setGoal(state, action: PayloadAction<Goal[]>) {
      state.goals = action.payload;
      state.goalIds = action.payload.map(goal => goal.id);

    },
    
  },
});

export const { setGoal } = goalSlice.actions;

export default goalSlice.reducer;

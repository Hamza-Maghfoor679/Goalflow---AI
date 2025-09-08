import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../api/api';
import auth from '@react-native-firebase/auth';

interface Task {
  id: string;
  title: string;
  // other fields as needed
}

interface ApiProps {
  goalId: string | null;
  phase: number | null;
  idToken: string | null;
  retry?: number;
}

interface TasksState {
  loading: boolean;
  aiGenData: Task[] | null;
  error: string | object | null;
}

const initialState: TasksState = {
  loading: false,
  aiGenData: null,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ goalId, phase, idToken }: ApiProps, { rejectWithValue }) => {
    if (!goalId || !phase || !idToken) {
      return rejectWithValue('Missing required parameters');
    }
     
    console.log('idToken', idToken)
    const maxRetries = 1;
    let attempts = 0;

    while (attempts <= maxRetries) {
      try {
         const currentUser = auth().currentUser;
        const freshIdToken = await currentUser?.getIdToken();
        const response = await axios.get(
          `${baseUrl}tasks/generate/goal/${goalId}?phase=${phase}`,
          {
            headers: {
              Authorization: `Bearer ${freshIdToken}`,
            },
            timeout: 90000,
          },
        );
        return response.data;
      } catch (error: any) {
        attempts++;
        console.error(`Fetch attempt ${attempts} failed`);
        if (attempts > maxRetries) {
          if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            'message' in error
          ) {
            return rejectWithValue(error.response?.data || error.message);
          }
          return rejectWithValue(error.toString());
        }
        // Optionally add delay before retrying
        await new Promise(res => setTimeout(res, 1000));
      }
    }
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true;
      state.aiGenData = null;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.aiGenData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.aiGenData = null;
      state.error = action.payload || 'Failed to fetch tasks';
    });
  },
});

export default tasksSlice.reducer;

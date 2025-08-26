// src/api/tasksApi.ts

import { api } from './api';

export const tasksApi = api.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<
      any,
      { goalId: string; phase: number; dayIndex: number }
    >({
      query: ({ goalId, phase, dayIndex }) =>
        `tasks/goals/${goalId}/tasks?phase=${phase}&dayIndex=${dayIndex}`,
    }),
    getProgress: build.query<any, { goalId: string }>({
      query: ({ goalId }) => `goals/${goalId}/progress`,
      providesTags: (result, error, { goalId }) => [
        { type: 'Progress', id: goalId },
      ],
    }),
    updateTask: build.mutation<
      any,
      { goalId: string; phaseNo: number; taskId: string }
    >({
      query: ({ goalId, phaseNo, taskId }) => ({
        url: `tasks/goals/${goalId}/phases/${phaseNo}/tasks/${taskId}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { goalId }) => [
        { type: 'Progress', id: goalId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useGetTasksQuery, useGetProgressQuery, useUpdateTaskMutation, useLazyGetTasksQuery } =
  tasksApi;

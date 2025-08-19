import { api } from './api';

export const tasksApi = api.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<any, any>({
      query: (goalId) => `/tasks/today/${goalId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetTasksQuery } = tasksApi;

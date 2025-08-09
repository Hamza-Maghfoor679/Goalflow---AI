import { api } from './api';

export const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    generateTasks: build.query<any, string>({
      query: (userId) => `ai/generate/tasks/${userId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGenerateTasksQuery } = homeApi;
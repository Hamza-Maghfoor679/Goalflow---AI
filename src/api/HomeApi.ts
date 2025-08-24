import { api } from './api';

export const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    generateTaskswithAi: build.query<any, any>({
      query: ({goalId, phase}) => `tasks/generate/goal/${goalId}?phase=${phase}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGenerateTaskswithAiQuery } = homeApi;
import { api } from './api';

export const homeApi = api.injectEndpoints({
  endpoints: build => ({
    generateTaskswithAi: build.query<any, any>({
      query: ({ goalId, phase }) =>
        `tasks/generate/goal/${goalId}?phase=${phase}`,
    }),
    generateQuotewithAi: build.query<any, any>({
      query: ({ goalId }) => `quotes/generate/goal/${goalId}`,
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGenerateTaskswithAiQuery, useGenerateQuotewithAiQuery } =
  homeApi;

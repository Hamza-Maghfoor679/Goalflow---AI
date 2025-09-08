import { api } from './api';

export const aiApi = api.injectEndpoints({
  endpoints: build => ({
  generateTaskswithAi: build.query<any, any>({
      query: ({ goalId, phase }) =>
        `tasks/generate/goal/${goalId}?phase=${phase}`,
    }),
    aiQuestionsGenerator: build.mutation<any, { title: string; category: string; timeframe: string }>({
      query: ({ title, category, timeframe }) => ({
        url: '/ai/questions',
        method: 'POST',
        body: {
          goal: {
            title,
            category,
            timeframe
          }
        }
      })
    })
  }),
  overrideExisting: true,
});

export const {
  useLazyGenerateTaskswithAiQuery,
  useGenerateTaskswithAiQuery,
  useAiQuestionsGeneratorMutation
} = aiApi;


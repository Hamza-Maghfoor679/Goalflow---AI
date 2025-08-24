import { api } from './api';

export const aiApi = api.injectEndpoints({
  endpoints: build => ({
    aiTaskGenerator: build.query<any, string>({
      query: goalId => `/tasks/generate/goal/${goalId}`,
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
  useLazyAiTaskGeneratorQuery,
  useAiTaskGeneratorQuery,
  useAiQuestionsGeneratorMutation
} = aiApi;


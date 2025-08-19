import { api } from './api';

export const aiApi = api.injectEndpoints({
  endpoints: build => ({
    aiTaskGenerator: build.query<any, string>({
      query: goalId => `/tasks/generate/goal/${goalId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyAiTaskGeneratorQuery, useAiTaskGeneratorQuery} = aiApi;

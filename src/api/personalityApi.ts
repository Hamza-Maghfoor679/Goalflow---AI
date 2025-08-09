import { api } from './api';

export const personalityApi = api.injectEndpoints({
  endpoints: (build) => ({
    generatePersonality: build.query<any, string>({
      query: (userId) => `ai/generate/personality/${userId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGeneratePersonalityQuery } = personalityApi;
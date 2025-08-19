import { api } from './api';

export const personalityApi = api.injectEndpoints({
  endpoints: (build) => ({
    generatePersonality: build.query<any, string>({
      query: (userId) => `ai/generate/personality/${userId}`,
      // ⏳ keep data cached for 24 hours (86400 seconds)
      keepUnusedDataFor: 86400,

    }),
  }),
  overrideExisting: true,
});

export const { useGeneratePersonalityQuery } = personalityApi;
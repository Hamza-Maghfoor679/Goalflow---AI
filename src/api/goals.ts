import { api } from './api';

export const goalApi = api.injectEndpoints({
  endpoints: (build) => ({
   getGoals: build.query<any, void>({
  query: () => `/goals`,
}),
  }),
  overrideExisting: true,
});

export const { useGetGoalsQuery } = goalApi;
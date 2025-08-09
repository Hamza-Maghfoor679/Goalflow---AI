import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<any, string>({
      query: (userId) => `users/user/${userId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserQuery } = userApi;
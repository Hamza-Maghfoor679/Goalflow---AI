import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<any, string>({
      query: (userId) => `users/user/${userId}`,
    }),
    userDetails: build.query<any, void>({
      query: () => `users/me`
    })
  }),
  overrideExisting: true,
});

export const { useGetUserQuery, useUserDetailsQuery } = userApi;
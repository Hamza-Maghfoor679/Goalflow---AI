// src/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store/store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://us-central1-goalflow-backend.cloudfunctions.net/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.idToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post'],
  endpoints: () => ({}),
});

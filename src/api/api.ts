// src/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import auth from '@react-native-firebase/auth';

const baseUrl = 'https://api-mpeufoitma-uc.a.run.app/api/'; // ✅ Full URL with /api

export const api = createApi({
  reducerPath: 'api', // ✅ Just a unique key (no URL here)
  baseQuery: fetchBaseQuery({
    baseUrl, // ✅ Correct full base URL
    prepareHeaders: async headers => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const freshIdToken = await currentUser.getIdToken();
        headers.set('Authorization', `Bearer ${freshIdToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Progress', 'Tasks'],
  endpoints: () => ({}),
});

// src/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import auth from '@react-native-firebase/auth';

export const baseUrl = 'https://api-mpeufoitma-uc.a.run.app/api/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async headers => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const freshIdToken = await currentUser.getIdToken();
        headers.set('Authorization', `Bearer ${freshIdToken}`);
      }
      
      return headers;
      
    },
    
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  // Check if error is a string (non-JSON response)
  if (result.error && typeof result.error.data === 'string') {
    return {
      error: {
        ...result.error,
        data: { message: result.error.data },
      },
    };
  }

  return result;
},
  tagTypes: ['User', 'Post', 'Progress', 'Tasks'],
  endpoints: () => ({}),
});

// src/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store/store';
import auth from '@react-native-firebase/auth';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-mpeufoitma-uc.a.run.app/api/',
    prepareHeaders: async (headers, { getState }) => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      const freshIdToken = await currentUser.getIdToken(); // fetches fresh token if needed
      headers.set('Authorization', `Bearer ${freshIdToken}`);
    }
      // const token = (getState() as RootState).auth.idToken;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post'],
  endpoints: () => ({}),
});

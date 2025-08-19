import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../slices/tokenSlice';
import goalsReducer from '../slices/goalsSlice';
import { api } from '../../api/api'; // This is your RTK Query base API

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, tokenReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    goals: goalsReducer,
    [api.reducerPath]: api.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware), // ✅ RTK Query middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

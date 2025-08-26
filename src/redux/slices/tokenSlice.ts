import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string | null;
  name: string | null;
  email: string | null;
  photo: string | null;
  givenName: string | null;  
  familyName: string | null;
  serverAuthCode?: string | null;
}

export interface UserDataState {
  user: UserProfile | null | undefined;
  serverAuthCode?: string | null;
  scopes?: string[];
}

export interface AuthState {
  idToken: string | null | undefined;
  userData: UserDataState | null;
  loginSuccess: boolean;
  Uid: string | null ;
  firebaseIdToken: string | null ;
}

const initialState: AuthState = {
  idToken: null,
  userData: null,
  loginSuccess: false,
  Uid: null,
  firebaseIdToken: null
};

const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIdToken: (state, action: PayloadAction<string | null>) => {
      state.idToken = action.payload;
    },
    clearIdToken: (state) => {
      state.idToken = null;
    },
    setUserData: (state, action: PayloadAction<UserDataState | null>) => {
      state.userData = action.payload;
    },
    setLoginSuccess: (state, action: PayloadAction<boolean>) => {
      state.loginSuccess = action.payload;
    },
    clearLoginSuccess: (state) => {
      state.loginSuccess = false;
    },
    setUid: (state, action) => {
      state.Uid = action.payload;
    },
    setFirebaseToken: (state, action) => {
      state.firebaseIdToken = action.payload
    },
    resetAuthState: () => initialState
  },
});

export const { 
  setIdToken, 
  clearIdToken, 
  setUserData, 
  setLoginSuccess, 
  clearLoginSuccess,
  setUid,
  setFirebaseToken,
  resetAuthState
} = tokenSlice.actions;

export default tokenSlice.reducer;
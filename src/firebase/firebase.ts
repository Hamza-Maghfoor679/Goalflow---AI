import { initializeApp } from 'firebase/app';
import {
  getAuth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBWNpLcbENdY1uMTJXg39KZN6I0RCnONOg",
  authDomain: "goalflow--ai.firebaseapp.com",
  projectId: "goalflow--ai",
  storageBucket: "goalflow--ai.appspot.com",
  messagingSenderId: "829121907619",
  appId: "1:829121907619:web:3677dd9e5524424c02a816",
  measurementId: "G-5H2YDN7930"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth service

export { app, auth };


import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCSSmBCQxV8mRcscNljC3nkenydhzmdy0",
  authDomain: "prodigymart-8f914.firebaseapp.com",
  projectId: "prodigymart-8f914",
  storageBucket: "prodigymart-8f914.appspot.com",
  messagingSenderId: "580628885895",
  appId: "1:580628885895:web:3f301c050acacdf4c82322",
  measurementId: "G-11T407KM55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Storage
const storage = getStorage(app);

export { auth, storage };

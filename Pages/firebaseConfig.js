// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
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

// Initialize Storage and export
const storage = getStorage(app);
export { storage };

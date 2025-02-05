// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIlYYoewwbV3G7ByIoest998tStYuzz9E",
  authDomain: "bookmytable-8f743.firebaseapp.com",
  projectId: "bookmytable-8f743",
  storageBucket: "bookmytable-8f743.appspot.com", // Fixed storage bucket typo
  messagingSenderId: "817294236594",
  appId: "1:817294236594:web:31f8737da4bc48a44e22ab",
  measurementId: "G-Y8R0VV2V4H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);
export const auth = getAuth(app);

export { app, database };

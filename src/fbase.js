// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// import { getFireStore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_MESSAGINGSENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fbAuth = getAuth();
export const fbFirestore = getFirestore();
export const fbStorage = getStorage(app);
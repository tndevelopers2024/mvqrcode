// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "mv-international-conference",
  "appId": "1:964528641072:web:545fad74ea426fe181c9f5",
  "storageBucket": "mv-international-conference.firebasestorage.app",
  "apiKey": "AIzaSyBc0Wbc7Xmo1A9HN0POOEBpLM44gIt83Jw",
  "authDomain": "mv-international-conference.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "964528641072"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };

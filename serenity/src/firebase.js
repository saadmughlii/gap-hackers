import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDl2v-kkSlioL9ScnGFYbku9IeNH4FpQYw",
  authDomain: "serenity-25039.firebaseapp.com",
  projectId: "serenity-25039",
  storageBucket: "serenity-25039.appspot.com",
  messagingSenderId: "108654893851",
  appId: "1:108654893851:web:39bb069bbe859dc61ad1be",
  measurementId: "G-RS1YR2LC79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Correct Firestore initialization
const auth = getAuth(app);

export { db, auth, collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp }; // Export addDoc and serverTimestamp

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCedozl7FkYRS1H6dWJB9TuzekQZ2O9PAc",
  authDomain: "chat-app-8465c.firebaseapp.com",
  projectId: "chat-app-8465c",
  storageBucket: "chat-app-8465c.firebasestorage.app",
  messagingSenderId: "413565119086",
  appId: "1:413565119086:web:7cb8c9543a96120ff3d47f",
  measurementId: "G-0NKQ4HB9SS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


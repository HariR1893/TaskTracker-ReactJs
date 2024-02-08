// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClt6rz41O9Gfx1GUkFqtAGXNxt90RnUiM",
  authDomain: "todo-app-77e36.firebaseapp.com",
  projectId: "todo-app-77e36",
  storageBucket: "todo-app-77e36.appspot.com",
  messagingSenderId: "396266861812",
  appId: "1:396266861812:web:3cd2d48dacd4cbd6f2daa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
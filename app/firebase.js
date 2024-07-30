// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHD-9XFrVbgzmrJLOHPoJfOqGkCYCbtC8",
  authDomain: "workout-log-37972.firebaseapp.com",
  projectId: "workout-log-37972",
  storageBucket: "workout-log-37972.appspot.com",
  messagingSenderId: "908799622920",
  appId: "1:908799622920:web:1d2b597dc8388243f4b6bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWj2euI92n-X1x1BgUxM80px74Ac02xWI",
  authDomain: "capstone-9a90b.firebaseapp.com",
  projectId: "capstone-9a90b",
  storageBucket: "capstone-9a90b.firebasestorage.app",
  messagingSenderId: "156805047807",
  appId: "1:156805047807:web:cd174e2f8c6d64c069b3ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}
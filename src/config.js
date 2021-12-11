// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB14hBfEL3BLOx4c7T6STfuNTQi4zo3LL8",
  authDomain: "phonereg-c71d4.firebaseapp.com",
  projectId: "phonereg-c71d4",
  storageBucket: "phonereg-c71d4.appspot.com",
  messagingSenderId: "503381986698",
  appId: "1:503381986698:web:ba7b44f4789907837c4c73",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

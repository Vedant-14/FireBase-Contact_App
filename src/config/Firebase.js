// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAE7ihDXSzdDJ0W1WqXx_XVrwGAhBDC4A",
  authDomain: "vite-contact-edb8b.firebaseapp.com",
  projectId: "vite-contact-edb8b",
  storageBucket: "vite-contact-edb8b.firebasestorage.app",
  messagingSenderId: "724348029925",
  appId: "1:724348029925:web:27dbaada92e3540e223d0c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
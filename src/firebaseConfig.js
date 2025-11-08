// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpasINyvT2tlOQMjZSgkwZnzyqxGeI82Q",
  authDomain: "proyecto-final-cms-2025iig2.firebaseapp.com",
  projectId: "proyecto-final-cms-2025iig2",
  storageBucket: "proyecto-final-cms-2025iig2.firebasestorage.app",
  messagingSenderId: "104228391005",
  appId: "1:104228391005:web:ae20a06d96e5053ee9e5b4",
  measurementId: "G-NEP2V5B424"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
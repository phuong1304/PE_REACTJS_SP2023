// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlKbrwEXkSKvkRImvSZvAOGdy4HOBbOR4",
    authDomain: "pereactsp2023.firebaseapp.com",
    projectId: "pereactsp2023",
    storageBucket: "pereactsp2023.appspot.com",
    messagingSenderId: "48345085635",
    appId: "1:48345085635:web:a7a45488c6fc0763aa1476",
    measurementId: "G-GDVD607Y1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
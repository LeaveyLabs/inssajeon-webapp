import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

/*
Ensures that tests will also re-direct to the .env.local file
*/
import dotenv from "dotenv";
dotenv.config({path: '.env.local'});

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

export const firebaseAuth = getAuth(firebaseApp)
export default firebaseApp
// 1. Add this import line!
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBMpjtEXjJXW0NBuYjR13CMcDyGrShrFPw",
    authDomain: "my-portfolio-limath.firebaseapp.com",
    projectId: "my-portfolio-limath",
    storageBucket: "my-portfolio-limath.firebasestorage.app",
    messagingSenderId: "815587738426",
    appId: "1:815587738426:web:b397eaa0c8b8fe25e84603",
    measurementId: "G-K885RDQZ5H"
};

// Now this will work because we imported it above
export const app = initializeApp(firebaseConfig);
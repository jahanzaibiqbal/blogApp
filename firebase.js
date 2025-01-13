// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

import {    

    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { doc, setDoc, getFirestore, getDoc, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQrk518mhUUlUjfeGbT46yBnIeOFx6ECQ",
    authDomain: "jahanzaibbatch-12.firebaseapp.com",
    projectId: "jahanzaibbatch-12",
    storageBucket: "jahanzaibbatch-12.firebasestorage.app",
    messagingSenderId: "194478057130", 
     appId: "1:194478057130:web:39b4fd855cb15d2c6ed2d3"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    app,
    getAuth,
    createUserWithEmailAndPassword,
    auth,
    doc, setDoc,
    db,
    signInWithEmailAndPassword,
    getDoc,
    onAuthStateChanged,
    collection, addDoc,
    getDocs
}


// https://firebase.google.com/docs/auth/web/password-auth
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCHUvSCbgz_Eyk7SkUx4xV4oZi5C_9X-2Y",
    authDomain: "pokedex-562f3.firebaseapp.com",
    projectId: "pokedex-562f3",
    storageBucket: "pokedex-562f3.appspot.com",
    messagingSenderId: "582798797933",
    appId: "1:582798797933:web:411c90a6b16bba76746364"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider()
const facebook = new FacebookAuthProvider();
const db = getFirestore();

export {
    app,
    google,
    facebook,
    db
}
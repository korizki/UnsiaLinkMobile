// import fire from 'firebase'
import firebase from 'firebase/compat/app'
// import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBO9ypTl_nIM0iAfrntIma3gMSa3rAmAPk",
   authDomain: "unsia-link.firebaseapp.com",
   projectId: "unsia-link",
   storageBucket: "unsia-link.appspot.com",
   messagingSenderId: "323606135828",
   appId: "1:323606135828:web:c34e9d0ec04ef16d501301",
   measurementId: "G-2LG5SB1NCR"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export { firebaseApp, db }
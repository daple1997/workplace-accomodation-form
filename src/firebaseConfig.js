import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm9sivYlSaxoYFbktWAtv8-L0nAnOlzo4",
  authDomain: "workplace-accomodation.firebaseapp.com",
  projectId: "workplace-accomodation",
  storageBucket: "workplace-accomodation.appspot.com",
  messagingSenderId: "1018299414199",
  appId: "1:1018299414199:web:55cab327c61435ff77bf32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app);
const db = getFirestore(app);

export default {storage, db};
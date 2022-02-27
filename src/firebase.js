//import firebase from "firebase/app";

// Import the functions we need from the SDKs we need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth"

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

// import { getAuth } from "firebase/auth";

// import { GoogleAuthProvider } from "firebase/auth";

// //import { getAnalytics } from "firebase/analytics";

// import { getStorage, ref } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPTbccs8wTWBE-UquwfDrMBpImtUqWwAo",
  authDomain: "project-tracker-e5c14.firebaseapp.com",
  projectId: "project-tracker-e5c14",
  storageBucket: "project-tracker-e5c14.appspot.com",
  messagingSenderId: "126622347061",
  appId: "1:126622347061:web:c44829b57625acbd8a667c",
  measurementId: "G-4FFNS3WHPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//represents db connection
const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app)

export {
  db,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
  auth
};

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import "firebase/compat/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";

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
const firebaseApp = initializeApp(firebaseConfig);

const analytics = getAnalytics(firebaseApp);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = getStorage(firebaseApp);

const db = firebaseApp.firestore();

export { auth, provider, db, storage };

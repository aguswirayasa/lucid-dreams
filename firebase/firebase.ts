import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import firebaseConfig from "./firebaseConfig";

// Check if Firebase is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the Firestore instance
export const firestore = firebase.firestore();

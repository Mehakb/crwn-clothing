import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC9bPJhRSty9hYd5BWAjZmvl8EMspT9F8k",
  authDomain: "crwn-clothing-db-ffcf8.firebaseapp.com",
  projectId: "crwn-clothing-db-ffcf8",
  storageBucket: "crwn-clothing-db-ffcf8.appspot.com",
  messagingSenderId: "461552097514",
  appId: "1:461552097514:web:b3cca37026e1f324009f93",
  measurementId: "G-KPGNJW8HTG"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
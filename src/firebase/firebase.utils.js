import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBuIuADXnCLfbS67tN4wPPYd9XspESl6MQ",
  authDomain: "e-commercesd.firebaseapp.com",
  databaseURL: "https://e-commercesd.firebaseio.com",
  projectId: "e-commercesd",
  storageBucket: "e-commercesd.appspot.com",
  messagingSenderId: "112350757238",
  appId: "1:112350757238:web:cde257dde27155e7ecfa57",
  measurementId: "G-PL0971K0NV",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

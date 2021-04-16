import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyB6-F_-EtLgq9bs32BdNEy9H597eW1NWNM",
    authDomain: "crwn-db-138a2.firebaseapp.com",
    projectId: "crwn-db-138a2",
    storageBucket: "crwn-db-138a2.appspot.com",
    messagingSenderId: "978870842451",
    appId: "1:978870842451:web:c31fa3e03e75c4dcd182a6",
    measurementId: "G-SQ92E82X3K"
  } ;

  export const createUserProfileDocument = async (userAuth, additionalData) => {

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists){

      const { displayName, email } = userAuth ;
      const createdAt = new Date();

      try {

        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      } catch (err) {

          console.log('error creating user', err.message);

      }

    }

    return userRef ;


  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


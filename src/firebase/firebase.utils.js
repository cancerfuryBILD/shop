import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAlEsqRJ7r3h17MoMZDtE5uj3x-3spLz1c",
    authDomain: "shop-4bb2d.firebaseapp.com",
    databaseURL: "https://shop-4bb2d.firebaseio.com",
    projectId: "shop-4bb2d",
    storageBucket: "shop-4bb2d.appspot.com",
    messagingSenderId: "534343177412",
    appId: "1:534343177412:web:0571998fb0590b61eca591",
    measurementId: "G-V7VSR5X5D6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
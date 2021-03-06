import firebase from 'firebase';
require('firebase/firestore');


const config = {
    apiKey: "AIzaSyAb3m4-J0-LSdP9MNKsRdvvWtw0lNA3SpI",
    authDomain: "too-many-authors.firebaseapp.com",
    databaseURL: "https://too-many-authors.firebaseio.com",
    projectId: "too-many-authors",
    storageBucket: "too-many-authors.appspot.com",
    messagingSenderId: "279852687810"
};


firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.database();
export const auth = firebase.auth();

export const storageKey = 'LOCAL_STORAGE_KEY';

export const firestore = firebase.firestore();

export const isAuthenticated = () => {
    return !!auth.currentUser;
}

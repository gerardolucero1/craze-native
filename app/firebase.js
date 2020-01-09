import firebase from 'firebase/app'

require('firebase/auth')
require('firebase/firestore')
require('firebase/storage')
require('firebase/functions')

var firebaseConfig = {
    apiKey: "AIzaSyB-Y8DHYC5ki4EKBojAfalAGYFPCuHaAFU",
    authDomain: "craze-71d6b.firebaseapp.com",
    databaseURL: "https://craze-71d6b.firebaseio.com",
    projectId: "craze-71d6b",
    storageBucket: "craze-71d6b.appspot.com",
    messagingSenderId: "999017124538",
    appId: "1:999017124538:web:524a9bb2cad04380d72883",
    measurementId: "G-TCL8FH6GTW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export { firebase, auth, db, storage, functions }
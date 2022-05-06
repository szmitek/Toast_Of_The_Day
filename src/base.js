import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCXLjfxA1kfVr4PLxf7ao9PPNOFWnnvQno",
    authDomain: "toast-of-the-day.firebaseapp.com",
    databaseURL: "https://toast-of-the-day-default-rtdb.europe-west1.firebasedatabase.app",
})

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export {firebaseApp};

//this is a default export
export default base;
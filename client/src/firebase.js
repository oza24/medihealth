import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUQSyA_a3IjIqkvI0y_BeyDJBssV4mZBU",
  authDomain: "app-6713e.firebaseapp.com",
  projectId: "app-6713e",
  storageBucket: "app-6713e.firebasestorage.app",
  messagingSenderId: "266928814543",
  appId: "1:266928814543:web:37e2075a5ebfdc04d03aba",
  measurementId: "G-FXHMREY1T0"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };
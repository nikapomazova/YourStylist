import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  applyActionCode
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "yourstylist.stereopi.com/",
    projectId: "yourstylist-450ba",
    storageBucket: "yourstylist-450ba.firebasestorage.app",
    messagingSenderId: "774264219494",
    appId: "1:774264219494:web:c207dfc2e053e87653caa7"
};
console.log(process.env.FIREBASE_API);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, applyActionCode, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification };
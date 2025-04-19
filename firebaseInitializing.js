import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCQ907RTSmRyw38xBoE9kOK7af4Ut4wIG0",
    authDomain: "yourstylist.stereopi.com/",
    projectId: "yourstylist-450ba",
    storageBucket: "yourstylist-450ba.firebasestorage.app",
    messagingSenderId: "774264219494",
    appId: "1:774264219494:web:c207dfc2e053e87653caa7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification };
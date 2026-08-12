import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-SmashSenseMobileDemoKey123",
  authDomain: "smashsense-ai.firebaseapp.com",
  projectId: "smashsense-ai",
  storageBucket: "smashsense-ai.appspot.com",
  messagingSenderId: "827853189558",
  appId: "1:827853189558:web:mobile123456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};

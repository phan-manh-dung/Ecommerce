// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAR7BkFVY9NwUszKuQP8sKVUaGGekBScEo',
  authDomain: 'verifyotpecommerce.firebaseapp.com',
  projectId: 'verifyotpecommerce',
  storageBucket: 'verifyotpecommerce.appspot.com',
  messagingSenderId: '486841995014',
  appId: '1:486841995014:web:e1b8984253c08d33899887',
  measurementId: 'G-5EMFK86HSL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAR7BkFVY9NwUszKuQP8sKVUaGGekBScEo',
  authDomain: 'verifyotpecommerce.firebaseapp.com',
  projectId: 'verifyotpecommerce',
  storageBucket: 'verifyotpecommerce.appspot.com',
  messagingSenderId: '486841995014',
  appId: '1:486841995014:web:e1b8984253c08d33899887',
  measurementId: 'G-5EMFK86HSL',
};

firebase.initializeApp(firebaseConfig);
export default firebase;

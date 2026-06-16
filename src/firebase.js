import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAcY4iJFcsv56eJY7i2EJnuDc3pCNWT-nM',
  authDomain: 'gw-positioning.firebaseapp.com',
  projectId: 'gw-positioning',
  storageBucket: 'gw-positioning.firebasestorage.app',
  messagingSenderId: '942897595511',
  appId: '1:942897595511:web:c24b140df0507df8dff272',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

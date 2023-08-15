
 import { initializeApp } from 'firebase/app'
 import { getAnalytics } from 'firebase/analytics'

 //firebase auth
 import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
 //firebase firestore
 import { getFirestore } from 'firebase/firestore'
  //firebase storage§
  import { getStorage } from 'firebase/storage'
 
 const firebaseConfig = {
  apiKey: "AIzaSyAOZ5eagVkfECfwASbYkiOjTZlcAZ8S7d0",
  authDomain: "aquilaweb-4632d.firebaseapp.com",
  projectId: "aquilaweb-4632d",
  storageBucket: "aquilaweb-4632d.appspot.com",
  messagingSenderId: "180193830248",
  appId: "1:180193830248:web:9051f4963f0ded106ca2dd",
  measurementId: "G-3JM5Z84XK7"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 export const auth = getAuth(app);
 export const googleProvider = new GoogleAuthProvider();
 export const createUser = createUserWithEmailAndPassword;
 export const firestore = getFirestore(app);
 export const storage = getStorage(app);
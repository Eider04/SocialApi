import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyA3qBuNerWorEUjbySWKBMl7Z3hZAXC1W4",
  authDomain: "redaca-681ae.firebaseapp.com",
  databaseURL: "https://redaca-681ae.firebaseio.com",
  projectId: "redaca-681ae",
  storageBucket: "redaca-681ae.appspot.com",
  messagingSenderId: "258930955261",
  appId: "1:258930955261:web:c3bf9a01b0fddc5803bf94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;


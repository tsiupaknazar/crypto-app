
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8OCq3SbDO45nDSDqWiK45vOwmaXjvxLs" || process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cryptoapp-c5da7.firebaseapp.com",
  projectId: "cryptoapp-c5da7",
  storageBucket: "cryptoapp-c5da7.appspot.com",
  messagingSenderId: "100638907013",
  appId: "1:100638907013:web:96ba32883627b0453c27ec"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
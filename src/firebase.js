import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcGFAI3Z058lZJjj2GLBpl_GzqZSI0Mn4",
  authDomain: "news-reader-app-triveous.firebaseapp.com",
  projectId: "news-reader-app-triveous",
  storageBucket: "news-reader-app-triveous.appspot.com",
  messagingSenderId: "697326573180",
  appId: "1:697326573180:web:92226d765770dc6fbd9bf9",
  measurementId: "G-2HVQL3EW1L",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

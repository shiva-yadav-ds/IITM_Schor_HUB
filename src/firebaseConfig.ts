import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACzWblOpBEuKzzQWVGIZfpYzApxjrc7gM",
  authDomain: "study-match-f9af3.firebaseapp.com",
  projectId: "study-match-f9af3",
  storageBucket: "study-match-f9af3.firebasestorage.app",
  messagingSenderId: "324379764891",
  appId: "1:324379764891:web:abdf457470fd46f0ad7e3e",
  databaseURL: "https://study-match-f9af3-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Set auth persistence to local storage
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting auth persistence:", error);
});

export default app;
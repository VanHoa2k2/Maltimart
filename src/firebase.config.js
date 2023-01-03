import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDw1Rzm9TdiqRYRp2ezOggYeLjdqfLdziw",
  authDomain: "maltimart-4cd8a.firebaseapp.com",
  projectId: "maltimart-4cd8a",
  storageBucket: "maltimart-4cd8a.appspot.com",
  messagingSenderId: "151976646774",
  appId: "1:151976646774:web:108246c88e4256c1e16757"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;
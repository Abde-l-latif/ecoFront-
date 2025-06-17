import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-6a120.firebaseapp.com", // project-id.firebaseapp.com
  projectId: "ecommerce-6a120",
  storageBucket: "ecommerce-6a120.firebasestorage.app",
  messagingSenderId: "228737304849",
  appId: "1:228737304849:web:d79e02f2b6f59663ab24b0",
  measurementId: "G-DVDTH80LZ8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth
const storage = getStorage(app);

export { auth, storage };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxtnVKFSc50_Ob8tlcj-jyAdhEMvHqiqE",
  authDomain: "fir-firestore-14386.firebaseapp.com",
  projectId: "fir-firestore-14386",
  storageBucket: "fir-firestore-14386.firebasestorage.app",
  messagingSenderId: "126408806905",
  appId: "1:126408806905:web:9130a68ae3e89d77006d28"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";

const firebaseMainConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_MAIN_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_MAIN_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_MAIN_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_MAIN_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MAIN_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_MAIN_APP_ID
};

const firebaseBackupConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_BACKUP_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_BACKUP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_BACKUP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_BACKUP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_BACKUP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_BACKUP_APP_ID
};

const main = initializeApp(firebaseMainConfig);
const backup = initializeApp(firebaseBackupConfig, "backup");

export { main, backup };

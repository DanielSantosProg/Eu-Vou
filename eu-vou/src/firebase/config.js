import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2ZQmba06JUnfH4ZV64dRTQQ7H4WHRiTU",
  authDomain: "eu-vou-290f1.firebaseapp.com",
  projectId: "eu-vou-290f1",
  storageBucket: "eu-vou-290f1.appspot.com",
  messagingSenderId: "756760881287",
  appId: "1:756760881287:web:3b7374180684118e9b3022",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

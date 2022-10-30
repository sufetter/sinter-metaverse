import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVLIDF7YRiZc-K0sDCk4tB6Af1CRZYFhE",
  authDomain: "sinter-metaverse.firebaseapp.com",
  projectId: "sinter-metaverse",
  storageBucket: "sinter-metaverse.appspot.com",
  messagingSenderId: "740073417736",
  appId: "1:740073417736:web:4ce665a4137d8736b135bd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

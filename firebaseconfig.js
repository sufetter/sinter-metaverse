import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJlP_2WDkXl6iBKlio6ZCtk--Dlpq-J04",
  authDomain: "sinter-chat.firebaseapp.com",
  projectId: "sinter-chat",
  storageBucket: "sinter-chat.appspot.com",
  messagingSenderId: "1046959762430",
  appId: "1:1046959762430:web:d394b73e102fd8c710aeaf",
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

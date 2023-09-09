import { initializeApp } from "firebase/app";
import { getFirestore, collection} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD-asCQCaYcysN_oAHl2zgep8YWaBJ35gc",
  authDomain: "note-hive-a0da6.firebaseapp.com",
  projectId: "note-hive-a0da6",
  storageBucket: "note-hive-a0da6.appspot.com",
  messagingSenderId: "901483433813",
  appId: "1:901483433813:web:50587249bad7d29961e9dc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notescollection = collection(db,"notes")
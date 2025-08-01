import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import firebaseConfig from "./config";

export class Firebase {
  public app: FirebaseApp;
  public db: Firestore;

  constructor() {
    this.app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }
}

const firebase = new Firebase();
export default firebase;

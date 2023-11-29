import firebaseConfig from "./Components/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const imageDb = getStorage(firebaseApp);

const textDb = getFirestore(firebaseApp)

export { auth, imageDb , textDb };

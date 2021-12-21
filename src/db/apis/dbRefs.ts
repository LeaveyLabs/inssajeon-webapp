import { collection, getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebase"
import { POST_DIR, USER_DIR, WORD_DIR } from "../strings/apiStringLibrary";

export const db = getFirestore(firebaseApp);

export const userDatabase = collection(db, USER_DIR);
export const postDatabase = collection(db, POST_DIR);
export const wordDatabase = collection(db, WORD_DIR);
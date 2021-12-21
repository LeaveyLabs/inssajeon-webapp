import { collection, getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebase"
import { POST_DIR, USER_DIR, WORD_DIR } from "../strings/apiStringLibrary";
import { getStorage } from "firebase/storage";

const dataDB = getFirestore(firebaseApp);

export const userDatabase = collection(dataDB, USER_DIR);
export const postDatabase = collection(dataDB, POST_DIR);
export const wordDatabase = collection(dataDB, WORD_DIR);
export const imgDatabase = getStorage(firebaseApp);

import { collection, getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebase"
import { POST_DIR, TAG_DIR, USER_DIR, WORD_DIR } from "../strings/apiConstLibrary";
import { getStorage } from "firebase/storage";

const dataDB = getFirestore(firebaseApp);

export const userDatabase = collection(dataDB, USER_DIR);
export const postDatabase = collection(dataDB, POST_DIR);
export const wordDatabase = collection(dataDB, WORD_DIR);
export const tagDatabase = collection(dataDB, TAG_DIR);
export const imgDatabase = getStorage(firebaseApp);

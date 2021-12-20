import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"; 
import { userDatabase } from "../../../src/db/apis/dbRefs";
import dotenv from "dotenv";
import firebaseApp from "../../../src/firebase";
import { DataQuery } from "../../../src/db/apis/DataQuery";

dotenv.config({path: '.env.local'});

/* Query.searchUserProfile */
describe("testing firebase", () => {
    it.only("checking if firebase is initialized", async () => {
        const docs = await getDocs(userDatabase);
    });
    it.only("running with empty profile", async () => {
        await DataQuery.searchUserProfile({});
    });
});
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"; 
import { postDatabase, userDatabase, wordDatabase } from "../../../src/db/apis/dbRefs";
import { DataQuery } from "../../../src/db/apis/DataQuery";
import { executeInDatabase, Verifier } from "./dbTestEnv";
import { UserFactory } from "../../../src/db/entities/users/User";

/* Query.searchUserProfile */
describe("testing firebase", () => {
    it("checking if firebase is initialized", async () => {
        await getDocs(userDatabase);
    });
    it.only("every profile uploaded should exist", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const userList = Array.from(verifier.users);
            /*
            For each user uploaded, search their profile in the database. 
            If they exist, then expect their result to be equal to the one on the database.
            */
            for(const user of userList) {
                const queryResult = await DataQuery.searchUserProfile(user.info);
                queryResult.forEach((result) => expect(result).toStrictEqual(user));
            }
        });
    });
});
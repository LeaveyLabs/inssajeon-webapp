import { getDocs } from "firebase/firestore"
import { userDatabase } from "../../../src/db/apis/dbRefs";
import { UserActivityWrite } from "../../../src/db/apis/UserActivityWrite";
import { DataQuery } from "../../../src/db/apis/DataQuery";
import { executeInDatabase, Verifier } from "./dbTestEnv";
import { v4 as uuidv4 } from 'uuid';

describe("testing ActivityWrite", () => {
    it("checking if firebase is initialized", async () => {
        await getDocs(userDatabase);
    });
    it("adding everything", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const userList = Array.from(verifier.users);
            const addPostID = String(uuidv4());
            for(const user of userList) {
                user.activity.upvotes.push(addPostID);
                user.activity.downvotes.push(addPostID);
                user.activity.favorites.push(addPostID);
                user.activity.submissions.push(addPostID);
                
                await UserActivityWrite.addUpvote(user.id, addPostID);
                await UserActivityWrite.addDownvote(user.id, addPostID);
                await UserActivityWrite.addFavorite(user.id, addPostID);
                await UserActivityWrite.addSubmission(user.id, addPostID);

                const queryUser = DataQuery.searchUserByUserID(user.id)[0];
                expect(queryUser.upvotes.sort()).toEqual(user.activity.upvotes.sort());
                expect(queryUser.downvotes.sort()).toEqual(user.activity.downvotes.sort());
                expect(queryUser.favorites.sort()).toEqual(user.activity.favorites.sort());
                expect(queryUser.submissions.sort()).toEqual(user.activity.submissions.sort());
            }
        });
    }, 30000);
    it("removing everything", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const userList = Array.from(verifier.users);
            for(const user of userList) {                
                await UserActivityWrite.removeUpvote(user.id, user.activity.upvotes.pop());
                await UserActivityWrite.removeDownvote(user.id, user.activity.downvotes.pop());
                await UserActivityWrite.removeFavorite(user.id, user.activity.favorites.pop());
                await UserActivityWrite.removeSubmission(user.id, user.activity.submissions.pop());

                const queryUser = DataQuery.searchUserByUserID(user.id)[0];
                expect(queryUser.upvotes.sort()).toEqual(user.activity.upvotes.sort());
                expect(queryUser.downvotes.sort()).toEqual(user.activity.downvotes.sort());
                expect(queryUser.favorites.sort()).toEqual(user.activity.favorites.sort());
                expect(queryUser.submissions.sort()).toEqual(user.activity.submissions.sort());
            }
        });
    }, 30000);
});
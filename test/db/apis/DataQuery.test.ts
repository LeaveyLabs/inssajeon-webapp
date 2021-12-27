import { getDocs } from "firebase/firestore"; 
import { userDatabase } from "../../../src/db/apis/dbRefs";
import { DataQuery, PostOrder, ProfileOrder } from "../../../src/db/apis/DataQuery";
import { executeInDatabase, Verifier } from "./dbTestEnv";
import { PostEntity } from "../../../src/db/entities/posts/PostEntity";
import { TagEntity } from "../../../src/db/entities/tags/TagEntity";

describe("testing DataQuery", () => {
    it("checking if firebase is initialized", async () => {
        await getDocs(userDatabase);
    });
    /* DataQuery.searchUserProfile */
    it("every uploaded profile can be queried sucessfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const userList = Array.from(verifier.users);
            /*
            For each user uploaded, search their profile in the database. 
            If they exist, then expect their result to be equal to the one on the database.
            */
            for(const user of userList) {
                const queryResult = await DataQuery.searchUserByUserInfo(user.info, ProfileOrder.Alphabetical);
                expect(queryResult.length).toBeGreaterThan(0);
                queryResult.forEach((result) => expect(result).toStrictEqual(user));
            }
        });
    });
   it("malformed profiles should not be present", async () => {});
   it("profile queries with missing information return the correct people", () => {});
   it("profile queries with missing information return no wrong people", () => {});
   /* DataQuery.searchTag */
   it("every uploaded tag can be queried successfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const tagSet = new Set<string>();
            const tagMap = new Map<string, Set<PostEntity>>();
            verifier.posts.forEach((post) => {
                for(const tagString of post.tags) {
                    /*
                    Map each tag to all the posts attached to it. 
                    Have a list of all the tags we want to search.
                    */
                    if(tagMap.has(tagString)) (tagMap.get(tagString) as Set<PostEntity>).add(post);
                    else tagMap.set(tagString, new Set([post]));
                    tagSet.add(tagString);
                };
            });
            const tagList = Array.from(tagSet);
            /*
            For each tag uploaded, search for its associated posts in the database. 
            If it exists, then expect the result to be equal to the one on the database.
            */
            for(const tagString of tagList) {
                const queryResult = await DataQuery.searchPostByTag(tagString, PostOrder.Trendscore);
                expect(queryResult.length).toBeGreaterThan(0);
                const queryResultSet = new Set(queryResult);
                expect(queryResultSet).toStrictEqual(tagMap.get(tagString));
            }
        });
    });
    /* DataQuery.*/
    
});
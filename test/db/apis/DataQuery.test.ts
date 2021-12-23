import { getDocs } from "firebase/firestore"; 
import { userDatabase } from "../../../src/db/apis/dbRefs";
import { DataQuery } from "../../../src/db/apis/DataQuery";
import { executeInDatabase, Verifier } from "./dbTestEnv";
import { PostEntity } from "../../../src/db/entities/posts/PostEntity";
import { Tag } from "../../../src/db/entities/posts/Tag";

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
                const queryResult = await DataQuery.searchUserProfile(user.info);
                expect(queryResult.length).toBeGreaterThan(0);
                queryResult.forEach((result) => expect(result).toStrictEqual(user));
            }
        });
    });
   it("malformed profiles should not be present", async () : Promise<void> => {

   });
   it("profile queries with missing information return the correct people", () => {});
   it("profile queries with missing information return no wrong people", () => {});
   /* DataQuery.searchTag */
   it("every uploaded tag can be queried successfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const tagSet = new Set<Tag>();
            const tagMap = new Map<Tag, Set<PostEntity>>();
            verifier.posts.forEach((post) => {
                for(const tag of post.tags) {
                    /*
                    Map each tag to all the posts attached to it. 
                    Have a list of all the tags we want to search.
                    */
                    if(tagMap.has(tag)) (tagMap.get(tag) as Set<PostEntity>).add(post);
                    else tagMap.set(tag, new Set([post]));
                    tagSet.add(tag);
                };
            });
            const tagList = Array.from(tagSet);
            /*
            For each tag uploaded, search for its associated posts in the database. 
            If it exists, then expect the result to be equal to the one on the database.
            */
            for(const tag of tagList) {
                const queryResult = await DataQuery.searchTag(tag);
                expect(queryResult.length).toBeGreaterThan(0);
                const queryResultSet = new Set(queryResult);
                expect(queryResultSet).toStrictEqual(tagMap.get(tag));
            }
        });
    });
    /* DataQuery.*/
    
});
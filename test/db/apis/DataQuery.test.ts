import { DocumentSnapshot, getDocs, Timestamp } from "firebase/firestore"; 
import { DataQuery, PostInteractionType, PostOrder, ProfileOrder, TagOrder, WordOrder } from "../../../src/db/apis/DataQuery";
import { executeInDatabase, Verifier } from "./dbTestEnv";
import { PostEntity, PostFactory } from "../../../src/db/entities/posts/PostEntity";
import { WordEntity } from "../../../src/db/entities/words/WordEntity";
import { UserEntity } from "../../../src/db/entities/users/UserEntity";
import { userDatabase } from "../../../src/db/apis/dbRefs";
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
                const queryResult = await DataQuery.searchUserByUserProfile(user.profile, 
                    ProfileOrder.Alphabetical);
                expect(queryResult.length).toBeGreaterThan(0);
                queryResult.forEach((result) => expect(result).toStrictEqual(user));
            }
        });
    }, 30000);
   it("malformed profiles should not be present", async () => {
    await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
        const queryResult = await DataQuery.searchUserByUserProfile(
            {username: "a"}, ProfileOrder.Alphabetical);
        expect(queryResult.length).toBe(0);
    });
   }, 30000);
   it("profile queries with missing information return the correct people", async () => {
    await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
        const userList = Array.from(verifier.users);
        /*
        For each user uploaded, search their a profile with missing information in the database. 
        If they exist, then expect their result to be equal to the one on the database.
        */
        for(const user of userList) {
            const modifiedInfo = {
                username: user.profile.username,
                bio: user.profile.bio,
            }
            const queryResult = await DataQuery.searchUserByUserProfile(modifiedInfo, ProfileOrder.Alphabetical);
            expect(queryResult.length).toBeGreaterThan(0);
            queryResult.forEach((result) => expect(result).toStrictEqual(user));
        }
    });
   }, 30000),
   it("post queries return the correct last post", async () => {
    await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
        const lastDoc:DocumentSnapshot[] = [];
        const queryResult = await DataQuery.getAllPosts(PostOrder.Recency, lastDoc);
        expect(queryResult[queryResult.length-1]).toEqual(PostFactory.fromExportJson(lastDoc[0].data()));
    });
   }, 30000),
   /* DataQuery.searchPostByTag */
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
                const realPostSet = tagMap.get(tagString);
                
                const queryPostIDs:string[] = [];
                const realPostIDs:string[] = [];
                
                if(queryResultSet) queryResultSet.forEach((post) => queryPostIDs.push(post.postID));
                if(realPostSet) realPostSet.forEach((post) => realPostIDs.push(post.postID));
                
                expect(queryPostIDs).toStrictEqual(realPostIDs);
            }
        });
    }, 30000);
    /* DataQuery.searchPostByWord */
    it("every uploaded word in a Post can be queried successfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const wordSet = new Set<string>();
            const wordMap = new Map<string, Set<PostEntity>>();
            verifier.posts.forEach((post) => {
                /*
                Map each word to all the posts attached to it. 
                Have a list of all the words we want to search.
                */
                if(wordMap.has(post.word)) (wordMap.get(post.word) as Set<PostEntity>).add(post);
                else wordMap.set(post.word, new Set([post]));
                wordSet.add(post.word);
            });
            const wordList = Array.from(wordSet);
            /*
            For each word uploaded, search for its associated posts in the database. 
            If it exists, then expect the result to be equal to the one on the database.
            */
            for(const word of wordList) {
                const queryResult = await DataQuery.searchPostByWord(word, PostOrder.Trendscore);
                expect(queryResult.length).toBeGreaterThan(0);

                const queryResultSet = new Set(queryResult);
                const realPostSet = wordMap.get(word);

                const queryPostIDs:string[] = [];
                const realPostIDs:string[] = [];
                
                if(queryResultSet) queryResultSet.forEach((post) => queryPostIDs.push(post.postID));
                if(realPostSet) realPostSet.forEach((post) => realPostIDs.push(post.postID));
                
                expect(queryPostIDs).toStrictEqual(realPostIDs);
            }
        });
    }, 30000);
    /* DataQuery.searchWordByWord */
    it("every uploaded word in a Word can be queried successfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const wordSet = new Set<string>();
            const wordMap = new Map<string, Set<WordEntity>>();
            verifier.words.forEach((word) => {
                /*
                Map each word to all the posts attached to it. 
                Have a list of all the words we want to search.
                */
                if(wordMap.has(word.wordString)) (wordMap.get(word.wordString) as Set<WordEntity>).add(word);
                else wordMap.set(word.wordString, new Set([word]));
                wordSet.add(word.wordString);
            });
            const wordList = Array.from(wordSet);
            /*
            For each word uploaded, search for its associated posts in the database. 
            If it exists, then expect the result to be equal to the one on the database.
            */
            for(const word of wordList) {
                const queryResult = await DataQuery.searchWordByWord(word, WordOrder.Trendscore);
                expect(queryResult.length).toBeGreaterThan(0);
                const queryResultSet = new Set(queryResult);
                expect(queryResultSet).toStrictEqual(wordMap.get(word));
            }
        });
    }, 30000);
    /* DataQuery.searchPostByPostID */
    it("every uploaded postID in a post can be queried successfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const postIDSet = new Set<string>();
            const postIDMap = new Map<string, PostEntity>();
            verifier.posts.forEach((post) => {
                /*
                Map each postID to all the posts attached to it. 
                Have a list of all the postIDs we want to search.
                */
                postIDMap.set(post.postID, post);
                postIDSet.add(post.postID);
            });
            const postIDList = Array.from(postIDSet);
            /*
            For each postID uploaded, search for its associated posts in the database. 
            If it exists, then expect the result to be equal to the one on the database.
            */
            for(const postID of postIDList) {
                const queryResult = await DataQuery.searchPostByPostID(postID);
                expect(queryResult.length).toBeGreaterThan(0);
                const post = postIDMap.get(postID);
                if (!post) continue;
                expect(queryResult[0].postID).toStrictEqual(post.postID);
            }
        });
    }, 30000);
    /* DataQuery.searchUserByUserID */
    it("every uploaded userID in a user can be queried successfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const userIDSet = new Set<string>();
            const userIDMap = new Map<string, Set<UserEntity>>();
            verifier.users.forEach((user) => {
                /*
                Map each userID to all the users attached to it. 
                Have a list of all the userIDs we want to search.
                */
                if(userIDMap.has(user.id)) (userIDMap.get(user.id) as Set<UserEntity>).add(user);
                else userIDMap.set(user.id, new Set([user]));
                userIDSet.add(user.id);
            });
            const userIDList = Array.from(userIDSet);
            /*
            For each userID uploaded, search for its associated users in the database. 
            If it exists, then expect the result to be equal to the one on the database.
            */
            for(const userID of userIDList) {
                const queryResult = await DataQuery.searchUserByUserID(userID);
                expect(queryResult.length).toBeGreaterThan(0);
                const queryResultSet = new Set(queryResult);
                expect(queryResultSet).toStrictEqual(userIDMap.get(userID));
            }
        });
    }, 30000);
    /* DataQuery.searchTagByTag */
    it("every uploaded TagEntity can be queried successfully", async () : Promise<void> => {
        await executeInDatabase(async (verifier:Verifier) : Promise<void> => {
            const tagStringSet = new Set<string>();
            const tagEntityMap = new Map<string, Set<TagEntity>>();
            verifier.tags.forEach((tag) => {
                /*
                Map each tagString to all the users attached to it. 
                Have a list of all the tagStrings we want to search.
                */
                if(tagEntityMap.has(tag.tagString)) (tagEntityMap.get(tag.tagString) as Set<TagEntity>).add(tag);
                else tagEntityMap.set(tag.tagString, new Set([tag]));
                tagStringSet.add(tag.tagString);
            });
            const tagStringList = Array.from(tagStringSet);
            /*
            For each tagString uploaded, search for its associated tags in the database. 
            If it exists, then expect the result to be equal to the one on the database.
            */
            for(const tagString of tagStringList) {
                const queryResult = await DataQuery.searchTagByTag(tagString, TagOrder.Trendscore);
                expect(queryResult.length).toBeGreaterThan(0);
                const queryResultSet = new Set(queryResult);
                expect(queryResultSet).toStrictEqual(tagEntityMap.get(tagString));
            }
        });
    }, 30000);
});
import { UserEntity } from "../../../src/db/entities/users/UserEntity"
import { PostEntity } from "../../../src/db/entities/posts/PostEntity";
import { WordEntity } from "../../../src/db/entities/words/WordEntity";
import { v4 as uuidv4 } from 'uuid';
import { deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { postDatabase, userDatabase, wordDatabase } from "../../../src/db/apis/dbRefs";
import { createRandomPostWithID, createRandomUser, createRandomUserWithID, createRandomWord } from "../entities/entityCreation";
import { TagEntity } from "../../../src/db/entities/tags/TagEntity";

export interface Verifier {
    users: Set<UserEntity>,
    posts: Set<PostEntity>,
    words: Set<WordEntity>,
    tags: Set<TagEntity>,
}

export type VerifierFunction = (v:Verifier) => Promise<any>;

export const executeInDatabase = async (testFunc:VerifierFunction) : Promise<void> => {
    const userSet:Set<UserEntity> = new Set<UserEntity>();
    const postSet:Set<PostEntity> = new Set<PostEntity>();
    const wordSet:Set<WordEntity> = new Set<WordEntity>();
    const tagSet:Set<TagEntity> = new Set<TagEntity>();
    /* 
    Define 10 Users
    */
    userSet.add(createRandomUser());
    for(const user of Array.from(userSet)) {
        const allPosts = user.activity.upvotes
        .concat(user.activity.downvotes)
        .concat(user.activity.favorites);

        for(const postID of allPosts) {
            /* Create a random post with this ID */
            const newPost = createRandomPostWithID(postID, uuidv4());
            postSet.add(newPost);
            /* Create a user for this post */
            const newUser = createRandomUserWithID(newPost.userID);
            newUser.info = newPost.userProfile;
            newUser.activity = {
                upvotes: [],
                downvotes: [],
                favorites: [],
                submissions: [postID],
                lastLogin: newPost.timestamp,
            }
            userSet.add(newUser);
            /* Add the post's word to Words */
            wordSet.add({
                wordString: newPost.word,
                trendscore: 10,
                numberOfPosts: 1,
            });
             /* Add the posts's tag to Tags */
            for(const tag of newPost.tags) {
                tagSet.add({
                    tagString: tag,
                    trendscore: 10,
                    numberOfPosts: 1,
                });
            }
        }
    }
    /* 
    Verifier holds each set of Objects. 
    Permits checking through Set operations.
    */
    const verifier:Verifier = {
        users: userSet,
        posts: postSet,
        words: wordSet,
        tags: tagSet,
    }
    /*
    Iterable lists of each set
    */
    const userList:Array<UserEntity> = Array.from(userSet);
    const postList:Array<PostEntity> = Array.from(postSet);
    const wordList:Array<WordEntity> = Array.from(wordSet);
    const tagList:Array<TagEntity> = Array.from(tagSet);

    /*
    Upload each set to the database. 
    */
    for(const user of userList) {
        await setDoc(doc(userDatabase, user.id), user);
    }
    for(const post of postList) {
        await setDoc(doc(postDatabase, post.postID), post);
    }
    for(const word of wordList) {
        await setDoc(doc(wordDatabase, word.wordString), word);
    }
    /*
    Run the function in this test environment.
    */
    await testFunc(verifier);
    /*
    Delete each set from the database. 
    */
    for(const user of userList) {
        await deleteDoc(doc(userDatabase, user.id));
    }
    for(const post of postList) {
        await deleteDoc(doc(postDatabase, post.postID));
    }
    for(const word of wordList) {
        await deleteDoc(doc(wordDatabase, word.wordString));
    }
};
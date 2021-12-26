import { arrayRemove, arrayUnion, doc, FieldValue, increment, setDoc, updateDoc } from "firebase/firestore";
import { PostEntity, PostFactory } from "../entities/posts/PostEntity";
import { WordEntity } from "../entities/words/WordEntity";
import { DataQuery, WordOrder } from "./DataQuery";
import { postDatabase, userDatabase, wordDatabase } from "./dbRefs";

export const PostWrite = function () {};
/**
 * @param  {string} userID - upvoter
 * @param  {string} postID - post to be upvoted
 * @returns Promise
 * @description adds an upvoter to the post's "upvotes" and removes from "downvotes" (backend server will update the count)
 */
PostWrite.upvotePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"upvotes": arrayUnion(userID)}); 
        await updateDoc(doc(postDatabase, postID), 
        {"downvotes": arrayRemove(userID)}); 
    }
    catch (e) { throw new Error("Could not add upvote to post"); }
}
/**
 * @param  {string} userID - downvoter
 * @param  {string} postID - post to be downvoted
 * @returns Promise
 * @description removes an upvoter to the post's "upvotes" and adds to "downvotes" (backend server will update the count)
 */
PostWrite.downvotePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"upvotes": arrayRemove(userID)}); 
        await updateDoc(doc(postDatabase, postID), 
        {"downvotes": arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add downvote to post"); }
}
/**
 * @param  {string} userID - sharer
 * @param  {string} postID - post to be shared
 * @returns Promise
 * @description adds a user to the "shares" element of a post
 */
PostWrite.sharePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"shares": arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add share to post"); }
}
/**
 * @param  {string} userID - flagger
 * @param  {string} postID - post to be flagged
 * @returns Promise
 * @description adds a user to the "flags" element of a post
 */
PostWrite.flagPost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"flags": arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add flag to post"); }
}
/**
 * @param  {string} userID - flagger
 * @param  {string} postID - post to be unflagged
 * @returns Promise
 * @description removes a user from the "flags" element of a post
 */
PostWrite.unflagPost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"flags": arrayRemove(userID)}); 
    }
    catch (e) { throw new Error("Could not remove flag from post"); }
}
/**
 * @param  {string} postID 
 * @param  {PostEntity} post
 * @returns Promise
 * @description adds a post to the database under the specified postID
 */
PostWrite.createPost = async (postID:string, post:PostEntity) : Promise<void> => {
    try { PostFactory.fromExportJson(post); }
    catch (e) { throw e; }

    try { await setDoc(doc(postDatabase, postID), PostFactory.toExportJson(post)); }
    catch (e) { throw new Error("Could add post to database."); }

    const matchWords = await DataQuery.searchWordByWord(post.word, WordOrder.Trendscore);
    if(matchWords.length == 0) {
        const newWord:WordEntity = {
            wordString: post.word,
            numberOfPosts: 1,
            trendscore: 0,
        };
        await setDoc(doc(wordDatabase, post.word), newWord);
    }
    else {
        await addPostToWord(postID, post.word);
    }
}
/**
 * @param  {string} postID
 * @returns Promise
 * @description removes a post with this postID
 */
PostWrite.removePost = async (postID:string) : Promise<void> => {
    const posts:Array<PostEntity> = await DataQuery.searchPostByPostID(postID);
    const post = posts[0];

    /* Get rid of the post from the word database */
    removePostFromWord(postID, post.word);

    /* Get rid of the post from the user who submitted it */
    removePostFromUser(post.userID, postID);

    /* For every user that upvoted or downvoted the post */
    for(const upvoterID of post.upvotes.concat(post.downvotes)) {
        /* Remove post from all user fields */
        removePostFromUser(upvoterID, postID);
    }
}

async function updateInssajeom(userID:string, newInssajeom:number) : Promise<void> {
    try { 
        await updateDoc(doc(userDatabase, userID), 
        {"profile.inssajeom": newInssajeom}); 
    }
    catch (e) { throw new Error("Could not update inssajeom."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description erases all traces of the post from the user's activity
 */
async function removePostFromUser(userID:string, postID:string) : Promise<void> {
    try {
        await updateDoc(doc(userDatabase, userID), 
        {"activity.upvotes": arrayRemove(postID), 
        "activity.downvotes": arrayRemove(postID),
        "activity.favorites": arrayRemove(postID), 
        "activity.submissions": arrayRemove(postID),
        }); 
    }
    catch(e) {throw new Error("Could not remove post from user activity."); }
}
/**
 * @param  {string} postID
 * @param  {string} word
 * @returns Promise
 * @description increments a word's count of posts
 */
async function addPostToWord(postID:string, word:string) : Promise<void> {
    try { 
        await updateDoc(doc(wordDatabase, postID), 
        {"numberOfPosts": increment(1)}); 
    }
    catch (e) { throw new Error(`Could not add post to word: ${word}`); }
}
/**
 * @param  {string} postID
 * @param  {string} word
 * @returns Promise
 * @description decrements a word's count of posts
 */
async function removePostFromWord(postID:string, word:string) : Promise<void> {
    try { 
        await updateDoc(doc(wordDatabase, postID), 
        {"numberofPosts": increment(-1)}); 
    }
    catch (e) { throw new Error(`Could not remove post from word: ${word}`); }
}

async function updatePostTrendscore(postID:string, score:number) : Promise<void> {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"trendscore": score}); 
    }
    catch (e) { throw new Error(`Could not update score for post: ${postID}`); }
}

async function updateWordTrendscore(word:string, score:number) : Promise<void> {
    try { 
        await updateDoc(doc(wordDatabase, word), 
        {"trendscore": score}); 
    }
    catch (e) { throw new Error(`Could not update score for word: ${word}.`); }
}
import { arrayRemove, arrayUnion, deleteDoc, doc, Timestamp, increment, setDoc, updateDoc } from "firebase/firestore";
import { PostEntity, PostFactory } from "../entities/posts/PostEntity";
import { WordEntity } from "../entities/words/WordEntity";
import { DataQuery, WordOrder } from "./DataQuery";
import { postDatabase, userDatabase, wordDatabase } from "./dbRefs";
import { USER_UPVOTES_PROPERTY, USER_DOWNVOTES_PROPERTY, 
    POST_UPVOTES_PROPERTY, POST_DOWNVOTES_PROPERTY, WORD_NUMBER_OF_POSTS_PROPERTY, USER_SUBMISSIONS_PROPERTY, USER_FAVORITES_PROPERTY, POST_SHARES_PROPERTY, POST_FLAGS_PROPERTY, POST_FAVORITES_PROPERTY, } from "../strings/apiConstLibrary";

export const PostInteraction = function () {};

/**
 * @param  {string} userID - upvoter
 * @param  {string} postID - post to be upvoted
 * @returns Promise
 * @description adds an upvoter to the post's "upvotes" and removes from "downvotes" (backend server will update the count)
 */
PostInteraction.upvotePost = async (userID:string, postID:string) : Promise<void> => {
    try {
        await updateDoc(doc(userDatabase, userID), 
        {[USER_UPVOTES_PROPERTY]: arrayUnion(postID),
        [USER_DOWNVOTES_PROPERTY]: arrayRemove(postID)});
        await updateDoc(doc(postDatabase, postID), 
        {[POST_UPVOTES_PROPERTY]: arrayUnion(userID),
        [POST_DOWNVOTES_PROPERTY]: arrayRemove(userID)}); 
    }
    catch (e) { throw new Error("Could not add upvote to post"); }
}

/**
 * @param  {string} userID - upvoter
 * @param  {string} postID - post to remove upvote
 * @returns Promise
 * @description removes a upvoter from "upvotes" (backend server will update the count)
 */
PostInteraction.unvotePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(userDatabase, userID), 
        {[USER_UPVOTES_PROPERTY]: arrayRemove(postID),
        [USER_DOWNVOTES_PROPERTY]: arrayRemove(postID)});
        await updateDoc(doc(postDatabase, postID), 
        {[POST_UPVOTES_PROPERTY]: arrayRemove(userID),
        [POST_DOWNVOTES_PROPERTY]: arrayRemove(userID)}); 
    }
    catch (e) { throw new Error("Could not remove upvote from post"); }
}

/**
 * @param  {string} userID - downvoter
 * @param  {string} postID - post to be downvoted
 * @returns Promise
 * @description removes an upvoter to the post's "upvotes" and adds to "downvotes" (backend server will update the count)
 */
PostInteraction.downvotePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(userDatabase, userID), 
        {[USER_UPVOTES_PROPERTY]: arrayRemove(postID),
        [USER_DOWNVOTES_PROPERTY]: arrayUnion(postID)});
        await updateDoc(doc(postDatabase, postID), 
        {[POST_UPVOTES_PROPERTY]: arrayRemove(userID),
        [POST_DOWNVOTES_PROPERTY]: arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add downvote to post"); }
}

/**
 * @param  {string} userID - sharer
 * @param  {string} postID - post to be shared
 * @returns Promise
 * @description adds a user to the "shares" element of a post
 */
PostInteraction.sharePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {[POST_SHARES_PROPERTY]: arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add share to post"); }
}

/**
 * @param  {string} userID - flagger
 * @param  {string} postID - post to be flagged
 * @returns Promise
 * @description adds a user to the "flags" element of a post
 */
PostInteraction.flagPost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {[POST_FLAGS_PROPERTY]: arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add flag to post"); }
}

/**
 * @param  {string} userID - flagger
 * @param  {string} postID - post to be unflagged
 * @returns Promise
 * @description removes a user from the "flags" element of a post
 */
PostInteraction.unflagPost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {[POST_FLAGS_PROPERTY]: arrayRemove(userID)}); 
    }
    catch (e) { throw new Error("Could not remove flag from post"); }
}

/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 */
PostInteraction.favoritePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(userDatabase, userID), 
        {[USER_FAVORITES_PROPERTY]: arrayUnion(postID)});
        await updateDoc(doc(postDatabase, postID), 
        {[POST_FAVORITES_PROPERTY]: arrayUnion(userID)});
    }
    catch (e) { throw new Error("Could not add to favorites."); }
}

/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 */
PostInteraction.unfavoritePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(userDatabase, userID), 
        {[USER_FAVORITES_PROPERTY]: arrayRemove(postID)});
        await updateDoc(doc(postDatabase, postID), 
        {[POST_FAVORITES_PROPERTY]: arrayRemove(userID)});
    }
    catch (e) { throw new Error("Could not remove from favorites."); }
}

/**
 * @param  {string} postID 
 * @param  {PostEntity} post
 * @returns Promise
 * @description adds a post to the database under the specified postID
 */
PostInteraction.createPost = async (postID:string, post:any) : Promise<void> => {
    /* Do not let user initialize post with upvotes, downvotes, time, etc. */
    const dbSafePost:PostEntity = {
        postID: postID,
        userID: post.userID,
        word: post.word,
        definition: post.definition,
        quote: post.quote,
        timestamp: Timestamp.fromDate(new Date()),
        tags: post.tags,
        metrics: {
            upvoteCount: 0,
            downvoteCount: 0,
            shareCount: 0,
            flagCount: 0,
            trendscore: 0,
        },
        userProfile: post.userProfile,
        upvotes: [],
        downvotes: [],
        shares: [],
        flags: [],
        favorites: [],
    };

    try { PostFactory.fromExportJson(dbSafePost); }
    catch (e) { throw e; }

    try { 
        await setDoc(doc(postDatabase, postID), PostFactory.toExportJson(dbSafePost)); 
    }
    catch (e) { 
        throw new Error(`Could not add post ${postID} to database.`); 
    }

    try { 
        await updateDoc(doc(userDatabase, dbSafePost.userID),
        {[USER_SUBMISSIONS_PROPERTY]: arrayUnion(postID)}); 
    }
    catch (e) {
        /* Clean up the post if impossible to add. */
        await deleteDoc(doc(postDatabase, postID));
        console.log(`Could not add post to ${dbSafePost.userID}'s submissions.`); 
    }

    const matchWords = await DataQuery.searchWordByWord(dbSafePost.word, WordOrder.Trendscore);
    if(matchWords.length === 0) {
        const newWord:WordEntity = {
            wordString: post.word,
            numberOfPosts: 1,
            trendscore: 0,
        };
        await setDoc(doc(wordDatabase, dbSafePost.word), newWord);
    }
    else {
        await addPostToWord(dbSafePost.word);
    }
}

/**
 * @param  {string} postID
 * @returns Promise
 * @description removes a post with this postID
 */
PostInteraction.removePost = async (postID:string) : Promise<void> => {
    const posts:Array<PostEntity> = await DataQuery.searchPostByPostID(postID);
    const post = posts[0];

    /* Get rid of the post from the word database */
    await removePostFromWord(post.word);

    /* Get rid of the post from the user who submitted it */
    await removePostFromUser(post.userID, postID);

    /* For every user that upvoted or downvoted the post */
    for(const upvoterID of post.upvotes.concat(post.downvotes)) {
        /* Remove post from all user fields */
        await removePostFromUser(upvoterID, postID);
    }

    /* Delete post from the database */
    try { await deleteDoc(doc(postDatabase, postID)); }
    catch (e) { throw new Error(`Could not remove post ${postID} to database.`); }
}

/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description erases all traces of the post from the user's activity,
 * will print a soft error if the post cannot be removed
 */
async function removePostFromUser(userID:string, postID:string) : Promise<void> {
    try {
        await updateDoc(doc(userDatabase, userID), 
        {[USER_UPVOTES_PROPERTY]: arrayRemove(postID), 
        [USER_DOWNVOTES_PROPERTY]: arrayRemove(postID),
        [USER_FAVORITES_PROPERTY]: arrayRemove(postID), 
        [USER_SUBMISSIONS_PROPERTY]: arrayRemove(postID),
        }); 
    }
    catch(e) { console.log(`Could not remove post from ${userID}'s activity`); }
}

/**
 * @param  {string} word
 * @returns Promise
 * @description increments a word's count of posts
 */
async function addPostToWord(word:string) : Promise<void> {
    try { 
        await updateDoc(doc(wordDatabase, word), 
        {[WORD_NUMBER_OF_POSTS_PROPERTY]: increment(1)}); 
    }
    catch (e) { throw new Error(`Could not add post to word: ${word}`); }
}

/**
 * @param  {string} word
 * @returns Promise
 * @description decrements a word's count of posts
 */
async function removePostFromWord(word:string) : Promise<void> {
    try { 
        await updateDoc(doc(wordDatabase, word), 
        {[WORD_NUMBER_OF_POSTS_PROPERTY]: increment(-1)}); 
    }
    catch (e) { console.log(`Could not remove post from word: ${word}`); }
}
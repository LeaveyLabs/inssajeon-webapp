import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { PostEntity, PostFactory } from "../entities/posts/PostEntity";
import { WordEntity } from "../entities/words/WordEntity";
import { DataQuery } from "./DataQuery";
import { postDatabase, userDatabase, wordDatabase } from "./dbRefs";

export const PostWrite = function () {};

PostWrite.upvotePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"upvotes": arrayUnion(userID)}); 
        await updateDoc(doc(postDatabase, postID), 
        {"downvotes": arrayRemove(userID)}); 
    }
    catch (e) { throw new Error("Could not add upvote to post"); }
}

PostWrite.downvotePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"upvotes": arrayRemove(userID)}); 
        await updateDoc(doc(postDatabase, postID), 
        {"downvotes": arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add downvote to post"); }
}

PostWrite.sharePost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"shares": arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add share to post"); }
}

PostWrite.flagPost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"flags": arrayUnion(userID)}); 
    }
    catch (e) { throw new Error("Could not add flag to post"); }
}

PostWrite.flagPost = async (userID:string, postID:string) : Promise<void> => {
    try { 
        await updateDoc(doc(postDatabase, postID), 
        {"flags": arrayRemove(userID)}); 
    }
    catch (e) { throw new Error("Could not remove flag from post"); }
}

PostWrite.createPost = async (postID:string, post:PostEntity) : Promise<void> => {
    try { PostFactory.fromExportJson(post); }
    catch (e) { throw e; }

    try { await setDoc(doc(postDatabase, postID), post); }
    catch (e) { throw new Error("Could add post to database."); }

    const matchWords = await DataQuery.searchWord(post.word);
    if(matchWords.length == 0) {
        const newWord:WordEntity = {
            wordString: post.word,
            wordPosts: [postID],
            trendscore: 0,
        };
        await setDoc(doc(wordDatabase, post.word), newWord);
    }
    else {
        await addPostToWord(postID, post.word);
    }
}

PostWrite.removePost = async (postID:string) : Promise<void> => {
    const posts:Array<PostEntity> = await DataQuery.searchPostID(postID);
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

async function addPostToWord(postID:string, word:string) : Promise<void> {
    try { 
        await updateDoc(doc(wordDatabase, postID), 
        {"wordPosts": arrayUnion(postID)}); 
    }
    catch (e) { throw new Error(`Could not add post to word: ${word}`); }
}

async function removePostFromWord(postID:string, word:string) : Promise<void> {
    try { 
        await updateDoc(doc(wordDatabase, postID), 
        {"wordPosts": arrayRemove(postID)}); 
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
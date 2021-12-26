import { doc, updateDoc } from "@firebase/firestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { userDatabase } from "./dbRefs";

export const ActivityWrite = function () {};
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description adds an upvoted post to the user's activity
 */
ActivityWrite.addUpvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.upvotes": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add upvote."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description removes an upvoted post from the user's activity
 */
ActivityWrite.removeUpvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.upvotes": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove upvote."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description adds a downvoted post to the user's activity
 */
ActivityWrite.addDownvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.downvotes": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add downvote."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description removes a downvoted post from the user's activity
 */
ActivityWrite.removeDownvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.downvotes": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove downvote."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description adds a favorited post to the user's actiivty
 */
ActivityWrite.addFavorite = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.favorites": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add to favorites."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description removes a favorited post from the user's activity
 */
ActivityWrite.removeFavorite = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.favorites": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove from favorites."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description adds a submitted post to the user's activity
 */
ActivityWrite.addSubmission = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.submissions": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add to submissions."); }
}
/**
 * @param  {string} userID
 * @param  {string} postID
 * @returns Promise
 * @description removes a submitted post to the user's activity
 */
ActivityWrite.removeSubmission = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.submissions": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove from submissions."); }
}
import { doc, updateDoc } from "@firebase/firestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { userDatabase } from "./dbRefs";

export const ActivityWrite = function () {};

ActivityWrite.addUpvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.upvotes": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add upvote."); }
}

ActivityWrite.removeUpvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.upvotes": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove upvote."); }
}

ActivityWrite.addDownvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.downvotes": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add downvote."); }
}

ActivityWrite.removeUpvote = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.downvotes": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove downvote."); }
}

ActivityWrite.addFavorite = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.favorites": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add to favorites."); }
}

ActivityWrite.removeFavorite = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.favorites": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove from favorites."); }
}

ActivityWrite.addSubmission = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.submissions": arrayUnion(postID)}); }
    catch (e) { throw new Error("Could not add to submissions."); }
}

ActivityWrite.removeSubmission = async (userID:string, postID:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"activity.submissions": arrayRemove(postID)}); }
    catch (e) { throw new Error("Could not remove from submissions."); }
}
import { deleteDoc, doc, setDoc, updateDoc } from "@firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { UserProfileEntity } from "../entities/users/UserProfileEntity";
import { UserEntity, UserFactory } from "../entities/users/UserEntity";
import { ACCOUNT_DEFAULT_SETTINGS, PROFILE_BIO_UPDATE_ERROR, PROFILE_PIC_UPDATE_ERROR, PROFILE_USERNAME_UPDATE_ERROR, PROFILE_USER_CREATION_ERROR, PROFILE_USER_DELETION_ERROR, USER_BIO_PROPERTY, USER_PIC_PATH_PROPERTY, USER_USERNAME_PROPERTY } from "../strings/apiConstLibrary";
import { userDatabase } from "./dbRefs";
import { DataQuery } from "./DataQuery";
import { PostInteraction } from "./PostInteraction";

export const ProfileInteraction = function () {};

/**
 * @param  {UserProfileEntity} userInfo
 * @param  {UserID} userID
 * @returns void
 * @decription add a new profile with a custom userID in the database
 */
ProfileInteraction.createAccount = async (userInfo:UserProfileEntity, 
    customID:string) : Promise<void> => {
    const userFromProfile:UserEntity = {
        id: customID,
        profile: userInfo,
        settings: ACCOUNT_DEFAULT_SETTINGS,
        activity: {
            upvotes: [],
            downvotes: [],
            submissions: [],
            favorites: [],
            lastLogin: Timestamp.fromDate(new Date()),
        },
        metrics: {
            inssajeom: 0,
        }
    }
    
    try { UserFactory.fromExportJson(userFromProfile); }
    catch (e) { throw e; }

    try { await setDoc(doc(userDatabase, customID), 
        UserFactory.toExportJson(userFromProfile)); }
    catch (e) { throw new Error(PROFILE_USER_CREATION_ERROR); }
      
    //can i add a finally(return userFromProfile) here?
}

/**
 * @param  {UserID} userID
 * @returns void
 * @decription delete a user's profile from the database
 */
ProfileInteraction.deleteProfile = async (userID:string) : Promise<void> => {
    const user:UserEntity = (await DataQuery.searchUserByUserID(userID))[0];
    /*
    Delete all votes and submissions by this user. 
    */
    for(const votedPost of user.activity.upvotes.concat(user.activity.downvotes)) {
        await PostInteraction.unvotePost(user.id, votedPost);
    }
    for(const submittedPost of user.activity.submissions) {
        await PostInteraction.removePost(submittedPost);
    }
    /*
    Delete the user from the database.
    */
    try { await deleteDoc(doc(userDatabase, userID)); }
    catch (e) { throw new Error(PROFILE_USER_DELETION_ERROR); }
}

/**
  * @param  {string} userID
  * @param  {string} username
  * @returns void
  * @throws error if username cannot be updated
  */
ProfileInteraction.setUsername = async (userID:string, username:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {[USER_USERNAME_PROPERTY]: username}); }
    catch (e) { throw new Error(PROFILE_USERNAME_UPDATE_ERROR); }
}

/**
 * @param  {string} userID
 * @param  {string} bio
 * @returns void
 * @throws error if bio cannot be updated
 */
ProfileInteraction.setBio = async (userID:string, bio:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {[USER_BIO_PROPERTY]: bio}); }
    catch (e) { throw new Error(PROFILE_BIO_UPDATE_ERROR); }
}
/**
 * @param  {string} userID
 * @param  {string} picPath
 * @returns void
 * @throws error if picPath cannot be updated
 */
ProfileInteraction.setPic = async (userID:string, picPath:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {[USER_PIC_PATH_PROPERTY]: picPath}); }
    catch (e) { throw new Error(PROFILE_PIC_UPDATE_ERROR); }
}

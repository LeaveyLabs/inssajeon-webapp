import { deleteDoc, doc, setDoc, updateDoc } from "@firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { UserInfoEntity } from "../entities/users/UserInfoEntity";
import { UserEntity, UserFactory } from "../entities/users/UserEntity";
import { ACCOUNT_DEFAULT_SETTINGS, PROFILE_BIO_UPDATE_ERROR, PROFILE_PIC_UPDATE_ERROR, PROFILE_USERNAME_UPDATE_ERROR, PROFILE_USER_CREATION_ERROR, PROFILE_USER_DELETION_ERROR } from "../strings/apiConstLibrary";
import { userDatabase } from "./dbRefs";

export const UserInfoWrite = function () {};

/**
 * @param  {UserInfoEntity} profile
 * @param  {UserID} userID
 * @returns void
 * @decription add a new profile with a custom userID in the database
 */
UserInfoWrite.createProfile = async (profile:UserInfoEntity, customID:string) : Promise<void> => {
    const userFromProfile:UserEntity = {
        id: customID,
        info: profile,
        account: ACCOUNT_DEFAULT_SETTINGS,
        activity: {
            upvotes: [],
            downvotes: [],
            submissions: [],
            favorites: [],
            lastLogin: Timestamp.fromDate(new Date()),
        }
    }
    
    try { UserFactory.fromExportJson(userFromProfile); }
    catch (e) { throw e; }

    try { await setDoc(doc(userDatabase, customID), 
        UserFactory.toExportJson(userFromProfile)); }
    catch (e) { throw new Error(PROFILE_USER_CREATION_ERROR); }
}

/**
 * @param  {UserID} userID
 * @returns void
 * @decription delete a user's profile from the database
 */
UserInfoWrite.deleteProfile = async (userID:string) : Promise<void> => {
    try { await deleteDoc(doc(userDatabase, userID)); }
    catch (e) { throw new Error(PROFILE_USER_DELETION_ERROR); }
}

/**
  * @param  {string} userID
  * @param  {string} username
  * @returns void
  * @throws error if username cannot be updated
  */
UserInfoWrite.setUsername = async (userID:string, username:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"profile.username": username}); }
    catch (e) { throw new Error(PROFILE_USERNAME_UPDATE_ERROR); }
}

/**
 * @param  {string} userID
 * @param  {string} bio
 * @returns void
 * @throws error if bio cannot be updated
 */
UserInfoWrite.setBio = async (userID:string, bio:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"profile.bio": bio}); }
    catch (e) { throw new Error(PROFILE_BIO_UPDATE_ERROR); }
}
/**
 * @param  {string} userID
 * @param  {string} picPath
 * @returns void
 * @throws error if picPath cannot be updated
 */
UserInfoWrite.setPic = async (userID:string, picPath:string) : Promise<void> => {
    try { await updateDoc(doc(userDatabase, userID), 
        {"profile.picPath": picPath}); }
    catch (e) { throw new Error(PROFILE_PIC_UPDATE_ERROR); }
}

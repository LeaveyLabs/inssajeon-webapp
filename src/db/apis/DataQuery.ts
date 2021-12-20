import { User } from "firebase/auth";
import { Profile, ProfileFactory } from "../entities/users/Profile";
import { POST_DIR, PROFILE_TYPE_ERROR, USER_DIR, USER_TYPE_ERROR, WORD_DIR } from "../strings/apiStringLibrary";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"; 
import { userDatabase } from "./dbRefs";
import { UserFactory } from "../entities/users/User";

export const DataQuery = function () {};

/**
 * @param  {any} profile - profile to search (any missing paramters should be empty strings)
 * @returns Promise<Array<User>> - promises a list of users that match the profile
 * @description queries the database for any users with a matching profile
 */
 DataQuery.searchUserProfile = async (profile:any) : Promise<Array<User>> => {
    /*
    Filter out all empty string fields, and convert them into query fields.
    */
    const profileFields = Object.keys(profile);
    const queryFields = profileFields.map(field => where(field, "==", profile[field]));
    /*
    Use the query fields to find a list of Users.
    */
    const profileQuery = query(userDatabase, ...queryFields);
    const userQueryResult = await getDocs(profileQuery);

    const validUserResults:Array<User> = []
    userQueryResult.forEach((user) => {
        /* Check whether profile match is a valid User interface */
        try { validUserResults.push(UserFactory.fromExportJson(user.data()));}
        catch (e) {/* Invalid users are skipped. */ }
    });
    console.log(validUserResults);
    return validUserResults;
};
import { User } from "firebase/auth";
import { Profile, ProfileFactory } from "../entities/users/Profile";
import { POST_DIR, POST_TAGS_HEADER, PROFILE_TYPE_ERROR, USER_DIR, USER_PROFILE_HEADER, USER_TYPE_ERROR, WORD_DIR } from "../strings/apiStringLibrary";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"; 
import { postDatabase, userDatabase } from "./dbRefs";
import { UserFactory } from "../entities/users/User";
import { Post, PostFactory } from "../entities/posts/Post";

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
    const queryFields = profileFields.map(field => 
        where(USER_PROFILE_HEADER + "." + field, "==", profile[field])
    );
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
    return validUserResults;
};

/**
 * @param  {string} tag - tag to search
 * @returns Promise<Array<Post>> - posts that match that tag
 * @description queries the firebase database to find all posts with a tag
 */
DataQuery.searchTag = async (tag: string) : Promise<Array<Post>> => {
    /*
    Query all posts with an identical tag.
    */
    const tagQuery = query(postDatabase, where(POST_TAGS_HEADER, "array-contains", tag));
    const tagQueryResult = await getDocs(tagQuery);
    /*
    Validate that the results are well-formed posts.
    */
    const validPostResults:Array<Post> = [];
    tagQueryResult.forEach((post) => {
        /* Check whether profile match is a valid User interface */
        try { validPostResults.push(PostFactory.fromExportJson(post.data()));}
        catch (e) {/* Invalid users are skipped. */ }
    });
    return validPostResults;
};

DataQuery.searchPostID = function () {};

DataQuery.searchUserID = function () {};

DataQuery.searchWord = function () {};


const nearWords = (word:string) => {
    throw Error("Not implemented");
}
const nearTags = (word:string) => {
    throw Error("Not implemented");
}


import { User } from "firebase/auth";
import { POST_POSTID_HEADER, POST_TAGS_HEADER, USER_PROFILE_HEADER, USER_USERID_HEADER, WORD_WORDSTRING_HEADER } from "../strings/apiConstLibrary";
import { getDocs, Query, query, where } from "firebase/firestore"; 
import { postDatabase, userDatabase, wordDatabase } from "./dbRefs";
import { UserFactory } from "../entities/users/UserEntity";
import { PostEntity, PostFactory } from "../entities/posts/PostEntity";
import { PostID } from "../entities/posts/PostID";
import { UserID } from "../entities/users/UserID";
import { EntityFactory } from "../entities/jsonFormat";
import { WordEntity, WordFactory } from "../entities/words/WordEntity";

export const DataQuery = function () {};

async function firebaseEntityQuery<Type> (query:Query, factory:EntityFactory) : Promise<Array<Type>> {
    /* Use the query to find a list of Entities. */
    const entityQueryResult = await getDocs(query);

    /* Prune any invalid entity results. */
    const validEntityResults:Array<Type> = []
    entityQueryResult.forEach((result) => {
        /* Attempt to use the factory to generate a valid entity  */
        try { validEntityResults.push(factory.fromExportJson(result.data()));}
        catch (e) {/* Invalid entities are skipped */ }
    });

    return validEntityResults;
}

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
    Call firebase to filter out and return a list of valid users.
    */
    const profileQuery = query(userDatabase, ...queryFields);
    const queryResult = await firebaseEntityQuery<User>(profileQuery, UserFactory);
    return queryResult;
};

/**
 * @param  {string} tag - tag to search
 * @returns Promise<Array<Post>> - posts that match that tag
 * @description queries the firebase database to find all posts with a tag
 */
DataQuery.searchTag = async (tag: string) : Promise<Array<PostEntity>> => {
    /*
    Query all posts with an identical tag. 
    Among these, call firebase to return all the valid posts.
    */
    const tagQuery = query(postDatabase, where(POST_TAGS_HEADER, "array-contains", tag));
    const tagQueryResult = await firebaseEntityQuery<PostEntity>(tagQuery, PostFactory);
    return tagQueryResult;
};

DataQuery.searchPostID = async (id:PostID) : Promise <Array<PostEntity>> => {
    /*
    Query posts with an identical postID.
    Among these, call firebase to return all the valid posts.
    */
    const postIDQuery = query(postDatabase, where(POST_POSTID_HEADER, "==", id));
    const postIDQueryResult = await firebaseEntityQuery<PostEntity>(postIDQuery, PostFactory);
    return postIDQueryResult;
};

DataQuery.searchUserID = async (id:UserID) : Promise<Array<User>> => {
    /*
    Query posts with an identical userID.
    Among these, call firebase to return all the valid users.
    */
    const userIDQuery = query(userDatabase, where(USER_USERID_HEADER, "==", id));
    const userIDQueryResult = await firebaseEntityQuery<User>(userIDQuery, UserFactory);
    return userIDQueryResult;
};

DataQuery.searchWord = async (word:string) : Promise<Array<WordEntity>> => {
    /*
    Query words with an identical wordString.
    Among these, call firebase to return all the valid words.
    */
    const wordQuery = query(wordDatabase, where(WORD_WORDSTRING_HEADER, "==", word));
    const wordQueryResult = await firebaseEntityQuery<WordEntity>(wordQuery, WordFactory);
    return wordQueryResult;
};

const nearWords = (word:string) => {
    throw Error("Not implemented");
}
const nearTags = (word:string) => {
    throw Error("Not implemented");
}


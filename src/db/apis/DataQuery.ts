import { User } from "firebase/auth";
import { MAX_QUERY, POST_POSTID_HEADER, POST_TAGS_HEADER, USER_PROFILE_HEADER, USER_USERID_HEADER } from "../strings/apiConstLibrary";
import { getDocs, limit, orderBy, Query, query, QueryConstraint, where } from "firebase/firestore"; 
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

export enum ProfileOrder {
    Alphabetical,
    Inssajeom, 
};

const profileOrderQuery:Array<QueryConstraint> = [
    orderBy("profile.username"),
    orderBy("profile.inssajeom"),
];

/**
 * @param  {any} profile - profile to search (any missing paramters should be empty strings)
 * @param {ProfileOrder} ordering - order to return the results in
 * @returns Promise<Array<User>> - promises a list of users that match the profile
 * @description queries the database for any users with a matching profile
 */
 DataQuery.searchUserByProfile = async (profile:any, ordering:ProfileOrder) : Promise<Array<User>> => {
    /*
    Filter out all empty string fields, and convert them into query fields.
    */
    const profileFields = Object.keys(profile);
    const queryFields = profileFields.map(field => 
        where(USER_PROFILE_HEADER + "." + field, "==", profile[field])
    );
    /*
    Order the query and limit the total results.
    */
    queryFields.push(profileOrderQuery[ordering]);
    queryFields.push(limit(MAX_QUERY));
    /*
    Use the query fields to find a list of Users.
    Call firebase to filter out and return a list of valid users.
    */
    const profileQuery = query(userDatabase, ...queryFields);
    const queryResult = await firebaseEntityQuery<User>(profileQuery, UserFactory);
    return queryResult;
};

export enum PostOrder {
    Trendscore, 
    Upvotes, 
    Recency,
};

const postOrderQuery:Array<QueryConstraint> = [
    orderBy("trendscore"),
    orderBy("upvoteCount"),
    orderBy("timestamp"),
];

/**
 * @param  {string} tag - tag to search
 * @param {PostOrder} ordering - ordering of posts to return the results in
 * @returns Promise<Array<Post>> - posts that match that tag
 * @description queries the firebase database to find all posts with a tag
 */
DataQuery.searchPostByTag = async (tag: string, ordering:PostOrder) : Promise<Array<PostEntity>> => {
    /*
    Query all posts with an identical tag. 
    */
    const queryFields:Array<QueryConstraint> = [where(POST_TAGS_HEADER, "array-contains", tag)];
    /*
    Order the query and limit the total results.
    */
    queryFields.push(postOrderQuery[ordering]);
    queryFields.push(limit(MAX_QUERY));
    /*
    Among these queries, call firebase to return all the valid posts.
    */
    const tagQuery = query(postDatabase, ...queryFields);
    const tagQueryResult = await firebaseEntityQuery<PostEntity>(tagQuery, PostFactory);
    return tagQueryResult;
};
/**
 * @param  {string} word
 * @param  {PostOrder} ordering
 * @returns Promise
 */
DataQuery.searchPostByWord = async (word:string, ordering:PostOrder) : Promise<Array<WordEntity>> => {
    /*
   Query all posts with an identical tag. 
   */
   const queryFields:Array<QueryConstraint> = [where("word", "==", word)];
   /*
   Order the query and limit the total results.
   */
   queryFields.push(postOrderQuery[ordering]);
   queryFields.push(limit(MAX_QUERY));
   /*
   Call firebase with these query fields.
   */
   const wordQuery = query(postDatabase, ...queryFields);
   const wordQueryResult = await firebaseEntityQuery<WordEntity>(wordQuery, PostFactory);
   return wordQueryResult;
};

export enum WordOrder {
    Trendscore, 
    NumberOfPosts,
}

const wordOrderQuery:Array<QueryConstraint> = [
    orderBy("trendscore"),
    orderBy("numberOfPosts"),
];
/**
 * @param  {string} word
 * @param  {WordOrder} ordering
 * @returns Promise
 */
DataQuery.searchWordByWord = async (word:string, ordering:WordOrder) : Promise<Array<WordEntity>> => {
    /*
   Query all posts with an identical tag. 
   */
   const queryFields:Array<QueryConstraint> = [where("wordString", "==", word)];
   /*
   Order the query and limit the total results.
   */
   queryFields.push(wordOrderQuery[ordering]);
   queryFields.push(limit(MAX_QUERY));
   /*
   Call firebase with these query fields.
   */
   const wordQuery = query(wordDatabase, ...queryFields);
   const wordQueryResult = await firebaseEntityQuery<WordEntity>(wordQuery, WordFactory);
   return wordQueryResult;
};
/**
 * @param  {PostID} id
 * @returns Promise
 */
DataQuery.searchPostByPostID = async (id:PostID) : Promise<Array<PostEntity>> => {
    /*
    Query posts with an identical postID.
    Among these, call firebase to return all the valid posts.
    */
    const postIDQuery = query(postDatabase, where(POST_POSTID_HEADER, "==", id));
    const postIDQueryResult = await firebaseEntityQuery<PostEntity>(postIDQuery, PostFactory);
    return postIDQueryResult;
};
/**
 * @param  {UserID} id
 * @returns Promise
 */
DataQuery.searchUserByUserID = async (id:UserID) : Promise<Array<User>> => {
    /*
    Query posts with an identical userID.
    Among these, call firebase to return all the valid users.
    */
    const userIDQuery = query(userDatabase, where(USER_USERID_HEADER, "==", id));
    const userIDQueryResult = await firebaseEntityQuery<User>(userIDQuery, UserFactory);
    return userIDQueryResult;
};

const nearWords = (word:string) => {
    throw Error("Not implemented");
}
const nearTags = (word:string) => {
    throw Error("Not implemented");
}


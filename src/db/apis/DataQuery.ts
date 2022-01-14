import { MAX_QUERY, POST_POSTID_HEADER, POST_TAGS_HEADER, POST_TRENDSCORE_PROPERTY, POST_UPVOTECOUNT_PROPERTY, USER_PROFILE_HEADER, USER_USERID_HEADER } from "../strings/apiConstLibrary";
import { CollectionReference, DocumentSnapshot, getDocs, limit, orderBy, Query, query, QueryConstraint, startAfter, where } from "firebase/firestore"; 
import { postDatabase, userDatabase, wordDatabase } from "./dbRefs";
import { UserEntity, UserFactory } from "../entities/users/UserEntity";
import { PostEntity, PostFactory } from "../entities/posts/PostEntity";
import { EntityFactory } from "../entities/jsonFormat";
import { WordEntity, WordFactory } from "../entities/words/WordEntity";

export const DataQuery = function () {};

async function firebaseEntityQuery<Type> (query:Query, factory:EntityFactory, 
    lastDoc?:DocumentSnapshot[]) : Promise<Array<Type>> {
    /* Use the query to find a list of Entities. */
    const entityQueryResult = await getDocs(query);

    /* Prune any invalid entity results. */
    const validEntityResults:Array<Type> = [];
    entityQueryResult.forEach((result) => {
        try { 
            /* Attempt to use the factory to generate a valid entity. */
            validEntityResults.push(factory.fromExportJson(result.data()));
            /* If necessary, record this as the last document reference. */
            if(lastDoc !== undefined) {
                if(lastDoc.length > 0) lastDoc.pop();
                lastDoc.push(result);
            }
        }
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
    orderBy("profile.inssajeom", "desc"),
];

/**
 * @param  {any} profile - profile to search (any missing paramters should be empty strings)
 * @param {ProfileOrder} ordering - order to return the results in
 * @param {DocumentSnapshot[]} lastDoc - last document read by the query
 * @returns Promise<Array<User>> is a list of users that match the profile
 * @description queries the database for any users with a matching profile
 * and updates "lastDoc" with the last document read by the query
 */
 DataQuery.searchUserByUserProfile = async (profile:any, ordering:ProfileOrder,
    lastDoc?:DocumentSnapshot[])
    :Promise<Array<UserEntity>> => {
    /*
    Filter out all empty string fields, and convert them into query fields.
    */
    const profileFields = Object.keys(profile);
    const queryFields = profileFields.map(field => 
        where(USER_PROFILE_HEADER + "." + field, "==", profile[field])
    );
    /*
    Order the query and limit the total results.
    Order alphabetically only if that's not a relevant query.
    Order after the last document if necessary.
    */
    if(ordering !== ProfileOrder.Alphabetical) {
        queryFields.push(profileOrderQuery[ordering]);
    }
    queryFields.push(limit(MAX_QUERY));
    if(lastDoc !== undefined && lastDoc.length > 0) {
        queryFields.push(startAfter(lastDoc[lastDoc.length-1]));
    }
    /*
    Use the query fields to find a list of Users.
    Call firebase to filter out and return a list of valid users.
    */
    const profileQuery = query(userDatabase, ...queryFields);
    const queryResult = await firebaseEntityQuery<UserEntity>(
        profileQuery, UserFactory, lastDoc);
    return queryResult;
};

export enum PostOrder {
    Trendscore, 
    Upvotes, 
    Recency,
};

const postOrderQuery:Array<QueryConstraint> = [
    orderBy(POST_TRENDSCORE_PROPERTY, "desc"),
    orderBy(POST_UPVOTECOUNT_PROPERTY, "desc"),
    orderBy("timestamp", "desc"),
];

/**
 * @param  {string} tag - tag to search
 * @param {PostOrder} ordering - ordering of posts to return the results in
 * @param {DocumentSnapshot[]} lastDoc - previous document to start after
 * @returns Promise<Array<Post>> - posts that match that tag
 * @description queries the firebase database to find all posts with a tag
 * updates the "lastDoc" with the last document read
 */
DataQuery.searchPostByTag = async (tag: string, ordering:PostOrder, 
    lastDoc?:DocumentSnapshot[])
    :Promise<Array<PostEntity>> => {
    /*
    Query all posts with an identical tag. 
    */
    const queryFields:Array<QueryConstraint> = [
        where(POST_TAGS_HEADER, "array-contains", tag)];
    /*
    Order the query and limit the total results.
    Order after the last result if necessary.
    */
    queryFields.push(postOrderQuery[ordering]);
    queryFields.push(limit(MAX_QUERY));
    if(lastDoc !== undefined && lastDoc.length > 0) {
        queryFields.push(startAfter(lastDoc[lastDoc.length-1]));
    }
    /*
    Among these queries, call firebase to return all the valid posts.
    */
    const tagQuery = query(postDatabase, ...queryFields);
    const tagQueryResult = await firebaseEntityQuery<PostEntity>(
        tagQuery, PostFactory, lastDoc);
    return tagQueryResult;
};

/**
 * @param  {string} word
 * @param  {PostOrder} ordering
 * @param {DocumentSnapshot[]} lastDoc? - previous document to start after
 * @returns Promise
 */
DataQuery.searchPostByWord = async (word:string, ordering:PostOrder, 
    lastDoc?:DocumentSnapshot[]) : Promise<Array<PostEntity>> => {
    /*
    Query all posts with an identical tag. 
    */
    const queryFields:Array<QueryConstraint> = [
        where("word", "==", word)];
    /*
    Order the query and limit the total results.
    Order after the last document if necessary.
    */
    queryFields.push(postOrderQuery[ordering]);
    queryFields.push(limit(MAX_QUERY));
    if(lastDoc !== undefined && lastDoc.length > 0) {
        queryFields.push(startAfter(lastDoc[lastDoc.length-1]));
    }
    /*
    Call firebase with these query fields.
    */
    const wordQuery = query(postDatabase, ...queryFields);
    const wordQueryResult = await firebaseEntityQuery<PostEntity>(
        wordQuery, PostFactory, lastDoc);
    return wordQueryResult;
};

export enum WordOrder {
    Trendscore, 
    NumberOfPosts,
}

const wordOrderQuery:Array<QueryConstraint> = [
    orderBy("trendscore", "desc"),
    orderBy("numberOfPosts", "desc"),
];

/**
 * @param  {string} word
 * @param  {WordOrder} ordering
 * @param  {DocumentSnapshot[]} lastDoc?
 * @returns Promise
 */
DataQuery.searchWordByWord = async (word:string, ordering:WordOrder, 
    lastDoc?:DocumentSnapshot[]) : Promise<Array<WordEntity>> => {
    /*
    Query all posts with an identical tag. 
    */
    const queryFields:Array<QueryConstraint> = [
        where("wordString", "==", word)];
    /*
    Order the query and limit the total results.
    */
    queryFields.push(wordOrderQuery[ordering]);
    queryFields.push(limit(MAX_QUERY));
    if(lastDoc !== undefined && lastDoc.length > 0) {
        queryFields.push(startAfter(lastDoc[lastDoc.length-1]));
    }
    /*
    Call firebase with these query fields.
    */
    const wordQuery = query(wordDatabase, ...queryFields);
    const wordQueryResult = await firebaseEntityQuery<WordEntity>(
        wordQuery, WordFactory, lastDoc);
    return wordQueryResult;
};

/**
 * @param  {PostID} id
 * @returns Promise
 */
DataQuery.searchPostByPostID = async (id:string) : Promise<Array<PostEntity>> => {
    /*
    Query posts with an identical postID.
    Among these, call firebase to return all the valid posts.
    */
    const postIDQuery = query(postDatabase, where(POST_POSTID_HEADER, "==", id));
    const postIDQueryResult = await firebaseEntityQuery<PostEntity>(
        postIDQuery, PostFactory);
    return postIDQueryResult;
};

/**
 * @param  {UserID} id
 * @returns Promise
 */
DataQuery.searchUserByUserID = async (id:string) : Promise<Array<UserEntity>> => {
    /*
    Query users with an identical userID.
    Among these, call firebase to return all the valid users.
    */
    const userIDQuery = query(userDatabase, where(USER_USERID_HEADER, "==", id));
    const userIDQueryResult = await firebaseEntityQuery<UserEntity>(
        userIDQuery, UserFactory);
    return userIDQueryResult;
};

/**
 * @param  {PostOrder} ordering
 * @param  {DocumentSnapshot[]} lastDoc?
 * @returns Promise
 */
DataQuery.getAllPosts = async (ordering:PostOrder, 
    lastDoc?:DocumentSnapshot[]) : Promise<Array<PostEntity>> => {
    /* Order the posts as specified, up to the limit of posts */
    const queryFields = [postOrderQuery[ordering], limit(MAX_QUERY)];
    if(lastDoc !== undefined && lastDoc.length > 0) {
        queryFields.push(startAfter(lastDoc[lastDoc.length-1]));
    }
    const orderedQuery = query(postDatabase, ...queryFields);
    /* Query the database for this order */
    return await firebaseEntityQuery<PostEntity>(
        orderedQuery, PostFactory, lastDoc);
}

/**
 * @param  {WordOrder} ordering
 * @param  {DocumentSnapshot[]} lastDoc?
 * @returns Promise
 */
DataQuery.getAllWords = async (ordering:WordOrder,
    lastDoc?:DocumentSnapshot[]) : Promise<Array<WordEntity>> => {
    /* Order the words as specified, up to the limit of words */
    const queryFields = [wordOrderQuery[ordering], limit(MAX_QUERY)];
    if(lastDoc !== undefined && lastDoc.length > 0) {
        queryFields.push(startAfter(lastDoc[lastDoc.length-1]));
    }
    const orderedQuery = query(wordDatabase, ...queryFields);
    /* Query the database for this order */
    return await firebaseEntityQuery<WordEntity>(
        orderedQuery, WordFactory, lastDoc);
}

const nearWords = (word:string) => {
    throw Error("Not implemented");
}
const nearTags = (word:string) => {
    throw Error("Not implemented");
}


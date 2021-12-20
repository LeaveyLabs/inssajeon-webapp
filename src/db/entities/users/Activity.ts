import {ACTIVITY_TYPE_ERROR} from "../../strings/apiStringLibrary";
import {EntityFactory, IDictionary, validatedObject} from '../jsonFormat';
import {PostIDSet, PostIDSetFactory} from '../posts/PostID';

/* Holds all of one user's interactions with 인싸전 posts */
export interface Activity extends IDictionary<Object> {
    upvotes: PostIDSet;
    downvotes: PostIDSet;
    favorites: PostIDSet;
    submissions: PostIDSet;
    lastLogin: Date;
};

/* Converts between JSON strings and Activity Objects */
export const ActivityFactory:EntityFactory = function () {};
/**
 * @param  {Activity} act
 * @returns Object
 * @description converts an Activity into a database-exportable activity object
 */
ActivityFactory.toExportJson = (e:Activity) : Object => {
    /* 
    Ensure the Activity JSON object has four keys 
    (upvotes, downvotes, favorites, submissions) each with 
    indexed sets. 
    */
    const act:Activity = {
        upvotes: PostIDSetFactory.toExportJson(e.upvotes),
        downvotes: PostIDSetFactory.toExportJson(e.downvotes),
        favorites: PostIDSetFactory.toExportJson(e.favorites),
        submissions: PostIDSetFactory.toExportJson(e.submissions),
        lastLogin: e.lastLogin, 
    }
    return validatedObject(act, ACTIVITY_TYPE_ERROR);
};
/**
 * @param  {any} json
 * @returns Activity
 * @description converts a database-exportable object into an activity
 */
ActivityFactory.fromExportJson = (json:any) : Activity  => {
    const act:Activity = {
        /* 
        Ensure the Activity Object has four PostIDSets
        */        
        upvotes: PostIDSetFactory.fromExportJson(json.upvotes),
        downvotes: PostIDSetFactory.fromExportJson(json.downvotes),
        favorites: PostIDSetFactory.fromExportJson(json.favorites),
        submissions: PostIDSetFactory.fromExportJson(json.submissions),
        lastLogin: json.lastLogin,
    };
    return validatedObject(act, ACTIVITY_TYPE_ERROR) as Activity;
};
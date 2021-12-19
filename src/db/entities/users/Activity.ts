import {ACTIVITY_TYPE_ERROR} from "../../strings/apiStringLibrary";
import {EntityFactory} from '../jsonFormat';
import {PostIDSet, PostIDSetFactory} from '../posts/PostID';

/* Holds all of one user's interactions with 인싸전 posts */
export interface Activity {
    upvotes: PostIDSet;
    favorites: PostIDSet;
    submissions: PostIDSet;
    lastLogin: Date;
};

/* Converts between JSON strings and Activity Objects */
export const ActivityFactory:EntityFactory = function () {};
/**
 * @param  {Entity} act
 * @returns Object
 * @description converts an Activity into a database-exportable activity object
 */
ActivityFactory.toExportJson = (e:Activity) : Object => {
    /* 
    Ensure the Activity JSON object has three keys 
    (upvotes, favorites, submissions) each with 
    indexed sets. 
    */
    const act = e as Activity;
    return {
        upvotes: PostIDSetFactory.toExportJson(act.upvotes),
        favorites: PostIDSetFactory.toExportJson(act.favorites),
        submissions: PostIDSetFactory.toExportJson(act.submissions),
        lastLogin: act.lastLogin, 
    }
};
/**
 * @param  {any} json
 * @returns Activity
 * @description converts a database-exportable object into an activity
 */
ActivityFactory.fromExportJson = (json:any) : Activity|null  => {
    try {
        return {
            /* 
            Ensure the Activity Object has three PostIDSets
            */
            upvotes: PostIDSetFactory.fromExportJson(json.upvotes),
            favorites: PostIDSetFactory.fromExportJson(json.favorites),
            submissions: PostIDSetFactory.fromExportJson(json.submissions),
            lastLogin: json.lastLogin,
        };
    }
    catch (e) {
        /* 
        If failure, then type conversion error. 
        */
        console.log(TypeError(ACTIVITY_TYPE_ERROR));
        console.log(e.stack);
    }
    return null;
};
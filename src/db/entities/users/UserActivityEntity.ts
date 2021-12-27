import { Timestamp } from "firebase/firestore";
import {ACTIVITY_TYPE_ERROR} from "../../strings/apiConstLibrary";
import {EntityFactory, IDictionary, validatedObject} from '../jsonFormat';
import { StringListFactory } from "../StringList";

/* Holds all of one user's interactions with 인싸전 posts */
export interface UserActivityEntity extends IDictionary<Object> {
    upvotes: Array<string>;
    downvotes: Array<string>;
    favorites: Array<string>;
    submissions: Array<string>;
    lastLogin: Timestamp;
};

/* Converts between JSON strings and Activity Objects */
export const UserActivityFactory:EntityFactory = function () {};
/**
 * @param  {UserActivityEntity} act
 * @returns Object
 * @description converts an Activity into a database-exportable activity object
 */
UserActivityFactory.toExportJson = (e:UserActivityEntity) : Object => {
    /* 
    Ensure the Activity JSON object has four keys 
    (upvotes, downvotes, favorites, submissions) each with 
    indexed sets. 
    */
    const act:UserActivityEntity = {
        upvotes: StringListFactory.toExportJson(e.upvotes),
        downvotes: StringListFactory.toExportJson(e.downvotes),
        favorites: StringListFactory.toExportJson(e.favorites),
        submissions: StringListFactory.toExportJson(e.submissions),
        lastLogin: new Timestamp(
            (e.lastLogin as Timestamp).seconds,
            (e.lastLogin as Timestamp).nanoseconds),
    }
    return validatedObject(act, ACTIVITY_TYPE_ERROR);
};
/**
 * @param  {any} json
 * @returns Activity
 * @description converts a database-exportable object into an activity
 */
UserActivityFactory.fromExportJson = (json:any) : UserActivityEntity  => {
    const act:UserActivityEntity = {
        /* 
        Ensure the Activity Object has four PostIDSets
        */        
        upvotes: StringListFactory.fromExportJson(json.upvotes),
        downvotes: StringListFactory.fromExportJson(json.downvotes),
        favorites: StringListFactory.fromExportJson(json.favorites),
        submissions: StringListFactory.fromExportJson(json.submissions),
        lastLogin: new Timestamp(
            (json.lastLogin as Timestamp).seconds,
            (json.lastLogin as Timestamp).nanoseconds),
    };
    return validatedObject(act, ACTIVITY_TYPE_ERROR) as UserActivityEntity;
};
import { USERIDSET_TYPE_ERROR } from "../../strings/apiStringLibrary";
import { EntityFactory, IndexedStringSet, jsonToStringSet, stringSetToJson, validatedObject } from "../jsonFormat";

/* Defines the database type of UserID */
export type UserID = string;
export type UserIDSet = Array<UserID>;

export const UserIDSetFactory:EntityFactory = function () {};

/**
 * @param  {UserIDSet} userIDSet
 * @returns Object
 */
UserIDSetFactory.toExportJson = (userIDSet:UserIDSet) : Object => {
    if(Array.isArray(userIDSet)) return userIDSet as UserIDSet;
    throw new TypeError(USERIDSET_TYPE_ERROR);
}

/**
 * @param  {any} json
 * @returns UserIDSet
 */
UserIDSetFactory.fromExportJson = (json:any) : UserIDSet => {
    if(Array.isArray(json)) return json as UserIDSet;
    throw new TypeError(USERIDSET_TYPE_ERROR);
}
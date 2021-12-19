import { EntityFactory, jsonToStringSet, stringSetToJson } from "../jsonFormat";

/* Defines the database type of UserID */
export type UserID = string;
export type UserIDSet = Set<UserID>;

export const UserIDSetFactory:EntityFactory = function () {};

/**
 * @param  {UserIDSet} userIDSet
 * @returns Object
 */
UserIDSetFactory.toExportJson = (userIDSet:UserIDSet) : Object => {
    return stringSetToJson(userIDSet);
}

/**
 * @param  {any} json
 * @returns UserIDSet
 */
UserIDSetFactory.fromExportJson = (json:any) : UserIDSet => {
    return jsonToStringSet(json);
}
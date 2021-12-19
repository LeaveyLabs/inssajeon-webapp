import { EntityFactory, IndexedStringSet, jsonToStringSet, stringSetToJson } from "../jsonFormat";

/* Defines the database type of PostID */
export type PostID = string;
export type PostIDSet = Set<PostID>;

export const PostIDSetFactory:EntityFactory = function () {};

/**
 * @param  {PostIDSet} postIDSet
 * @returns Object
 */
PostIDSetFactory.toExportJson = (postIDSet:PostIDSet) : Object => {
    return stringSetToJson(postIDSet);
}

/**
 * @param  {Object} json
 * @returns PostIDSet
 */
PostIDSetFactory.fromExportJson = (json:any) : PostIDSet => {
    return jsonToStringSet(json);
}
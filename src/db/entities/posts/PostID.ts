import { POSTIDSET_TYPE_ERROR } from "../../strings/apiStringLibrary";
import { EntityFactory, IndexedEntitySet, IndexedStringSet, jsonToStringSet, stringSetToJson, validatedObject } from "../jsonFormat";

/* Defines the database type of PostID */
export type PostID = string;
export type PostIDSet = Array<PostID>;

export const PostIDSetFactory:EntityFactory = function () {};

/**
 * @param  {PostIDSet} postIDSet
 * @returns Object
 */
PostIDSetFactory.toExportJson = (postIDSet:PostIDSet) : Object => {
    if(Array.isArray(postIDSet)) return postIDSet;
    else throw new TypeError(POSTIDSET_TYPE_ERROR);
}

/**
 * @param  {Object} json
 * @returns PostIDSet
 */
PostIDSetFactory.fromExportJson = (json:Object) : PostIDSet => {
    if(Array.isArray(json)) return json as PostIDSet;
    else throw new TypeError(POSTIDSET_TYPE_ERROR);
}
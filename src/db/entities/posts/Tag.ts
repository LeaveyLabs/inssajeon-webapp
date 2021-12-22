import { TAGSET_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IndexedStringSet, jsonToStringSet, stringSetToJson, validatedObject } from "../jsonFormat";

export type Tag = string;
export type TagSet = Array<Tag>;

export const TagSetFactory:EntityFactory = function () {};

/**
 * @param  {TagSet} TagSet
 * @returns Object
 */
 TagSetFactory.toExportJson = (tagSet:TagSet) : Object => {
    if(Array.isArray(tagSet)) return tagSet;
    else throw new TypeError(TAGSET_TYPE_ERROR);
}

/**
 * @param  {any} json
 * @returns TagSet
 */
 TagSetFactory.fromExportJson = (json:any) : TagSet => {
    if(Array.isArray(json)) return json as TagSet;
    throw new TypeError(TAGSET_TYPE_ERROR);
}
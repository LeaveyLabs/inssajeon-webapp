import { EntityFactory, jsonToStringSet, stringSetToJson } from "../jsonFormat";

export type Tag = string;
export type TagSet = Set<Tag>;

export const TagSetFactory:EntityFactory = function () {};

/**
 * @param  {TagSet} TagSet
 * @returns Object
 */
 TagSetFactory.toExportJson = (tagSet:TagSet) : Object => {
    return stringSetToJson(tagSet);
}

/**
 * @param  {any} json
 * @returns TagSet
 */
 TagSetFactory.fromExportJson = (json:any) : TagSet => {
    return jsonToStringSet(json);
}
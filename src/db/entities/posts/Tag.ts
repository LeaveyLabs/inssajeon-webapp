import { EntityFactory, jsonToStringSet, stringSetToJson } from "../jsonFormat";

export type Tag = string;
export type TagSet = Set<Tag>;

export const TagFactory:EntityFactory = function () {};

/**
 * @param  {TagSet} TagSet
 * @returns Object
 */
 TagFactory.toExportJson = (tagSet:TagSet) : Object => {
    return stringSetToJson(tagSet);
}

/**
 * @param  {any} json
 * @returns TagSet
 */
 TagFactory.fromExportJson = (json:any) : TagSet => {
    return jsonToStringSet(json);
}
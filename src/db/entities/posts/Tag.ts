import { TAGSET_TYPE_ERROR, TAG_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IndexedStringSet, jsonToStringSet, stringSetToJson, validatedObject } from "../jsonFormat";

export interface Tag {
    tagString: string,
    numberOfPosts: number, 
    trendscore: number,
};

export const TagFactory:EntityFactory = function () {};

/**
 * @param  {Tag} tag
 * @returns Object
 */
TagFactory.toExportJson = (tag:Tag) : Object => {
    const o = {
        tagString: tag.tagString,
        numberOfPosts: tag.numberOfPosts,
        trendscore: tag.trendscore,
    }
    return validatedObject(o, TAG_TYPE_ERROR);
}

/**
 * @param  {any} json
 * @returns Tag
 */
TagFactory.fromExportJson = (json:any) : Tag => {
    const tag:Tag = {
        tagString: json.tagString,
        numberOfPosts: json.numberOfPosts,
        trendscore: json.trendscore,
    }
    return validatedObject(tag, TAG_TYPE_ERROR) as Tag;
}

export type TagSet = Array<Tag>;

export const TagSetFactory:EntityFactory = function () {};

/**
 * @param  {TagSet} TagSet
 * @returns Object
 */
 TagSetFactory.toExportJson = (tagSet:TagSet) : Array<Object> => {
    if(Array.isArray(tagSet)) {
        return tagSet.map((tag) => TagFactory.toExportJson(tag));
    } 
    else throw new TypeError(TAGSET_TYPE_ERROR);
}

/**
 * @param  {any} json
 * @returns TagSet
 */
 TagSetFactory.fromExportJson = (json:any) : TagSet => {
    if(Array.isArray(json)) {
        return json.map((tag) => TagFactory.fromExportJson(tag));
    } 
    throw new TypeError(TAGSET_TYPE_ERROR);
}
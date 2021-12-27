import { TAGSET_TYPE_ERROR, TAG_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IndexedStringSet, jsonToStringSet, stringSetToJson, validatedObject } from "../jsonFormat";

export interface TagEntity {
    tagString: string,
    numberOfPosts: number, 
    trendscore: number,
};

export const TagFactory:EntityFactory = function () {};

/**
 * @param  {TagEntity} tag
 * @returns Object
 */
TagFactory.toExportJson = (tag:TagEntity) : Object => {
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
TagFactory.fromExportJson = (json:any) : TagEntity => {
    const tag:TagEntity = {
        tagString: json.tagString,
        numberOfPosts: json.numberOfPosts,
        trendscore: json.trendscore,
    }
    return validatedObject(tag, TAG_TYPE_ERROR) as TagEntity;
}
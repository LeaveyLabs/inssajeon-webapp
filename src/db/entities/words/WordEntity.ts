import { WORD_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";
import { PostIDSet, PostIDSetFactory } from "../posts/PostID";

export interface WordEntity extends IDictionary<Object> {
    readonly wordString: string;
    wordPosts: PostIDSet;
    trendscore: number;
};

export const WordFactory:EntityFactory = function () {};

/**
 * @param  {WordEntity} word
 * @returns Object
 */
WordFactory.toExportJson = (word:WordEntity) : Object => {
    const o:WordEntity = {
        wordString: word.wordString,
        wordPosts: PostIDSetFactory.toExportJson(word.wordPosts),
        trendscore: word.trendscore,
    };
    return validatedObject(o, WORD_TYPE_ERROR);
};

/**
 * @param  {any} json
 * @returns Word
 */
WordFactory.fromExportJson = (json:any) : WordEntity => {
    const word:WordEntity = {
        wordString: json.wordString,
        wordPosts: PostIDSetFactory.fromExportJson(json.wordPosts),
        trendscore: json.trendscore,
    };
    return validatedObject(word, WORD_TYPE_ERROR) as WordEntity;
}

import { WORD_TYPE_ERROR } from "../../strings/apiStringLibrary";
import { EntityFactory, validatedObject } from "../jsonFormat";
import { PostIDSet, PostIDSetFactory } from "../posts/PostID";

export interface Word {
    readonly wordString: string;
    wordPosts: PostIDSet;
    trendscore: number;
};

export const WordFactory:EntityFactory = function () {};

/**
 * @param  {Word} word
 * @returns Object
 */
WordFactory.toExportJson = (word:Word) : Object => {
    const o:Word = {
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
WordFactory.fromExportJson = (json:any) : Word => {
    const word:Word = {
        wordString: json.wordString,
        wordPosts: PostIDSetFactory.fromExportJson(json.wordPosts),
        trendscore: json.trendscore,
    };
    return validatedObject(word, WORD_TYPE_ERROR) as Word;
}

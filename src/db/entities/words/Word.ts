import { WORD_TYPE_ERROR } from "../../strings/apiStringLibrary";
import { EntityFactory } from "../jsonFormat";
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
    return {
        wordString: word.wordString,
        wordPosts: PostIDSetFactory.toExportJson(word.wordPosts),
        trendscore: word.trendscore,
    };
};

/**
 * @param  {any} json
 * @returns Word
 */
WordFactory.fromExportJson = (json:any) : Word | null => {
    try {
        return {
            wordString: json.wordString,
            wordPosts: PostIDSetFactory.fromExportJson(json.wordPosts),
            trendscore: json.trendscore,
        };
    }
    catch (e) {
        /* 
        If conversion fails, then type error!
        */
        console.log(TypeError(WORD_TYPE_ERROR));
        console.log(e.stack);
    }
    return null;
}

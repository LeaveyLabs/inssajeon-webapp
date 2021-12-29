import { Timestamp } from 'firebase/firestore';
import { POST_TYPE_ERROR } from '../../strings/apiConstLibrary';
import { EntityFactory, IDictionary, validatedObject } from '../jsonFormat';
import { UserInfoEntity, UserInfoFactory } from '../users/UserInfoEntity';
import { StringListFactory } from '../StringList';

export interface PostEntity extends IDictionary<Object> {
    readonly postID: string;
    readonly userID: string;
    readonly word: string;
    readonly definition: string;
    readonly quote: string;
    readonly timestamp: Timestamp;
    readonly tags: Array<string>;
    trendscore: number;    
    userProfile: UserInfoEntity;
    upvotes: Array<string>;
    downvotes: Array<string>;
    shares: Array<string>;
    flags: Array<string>;
    upvoteCount: number;
    downvoteCount: number;
    shareCount: number;
    flagCount: number;
}

export const PostFactory:EntityFactory = function () {};
/**
 * @param  {PostEntity} post
 * @returns Object
 */
PostFactory.toExportJson = (post:PostEntity) : Object => {
    /* 
    Ensure all data members are in the correct format. 
    Primitives are copied over. 
    Entities are funnelled through. 
    */
    const o = {
        postID: String(post.postID),
        userID: String(post.userID),
        word: String(post.word),
        definition: String(post.definition),
        quote: String(post.quote),
        timestamp: new Timestamp(
            (post.timestamp as Timestamp).seconds,
            (post.timestamp as Timestamp).nanoseconds),
        trendscore: Number(post.trendscore),

        tags: StringListFactory.toExportJson(post.tags), 
        userProfile: UserInfoFactory.toExportJson(post.userProfile),
        upvotes: StringListFactory.toExportJson(post.upvotes),
        downvotes: StringListFactory.toExportJson(post.downvotes),
        shares: StringListFactory.toExportJson(post.shares),
        flags: StringListFactory.toExportJson(post.flags),

        upvoteCount: Number(post.upvoteCount),
        downvoteCount: Number(post.downvoteCount),
        shareCount: Number(post.shareCount),
        flagCount: Number(post.flagCount),
    }
    return validatedObject(o, POST_TYPE_ERROR);
};

/**
 * @param  {any} json
 * @returns Post
 */
PostFactory.fromExportJson = (json:any) : PostEntity => {
    /* 
    Ensure all data members are in the correct format. 
    Primitives are copied over. 
    Entities are funnelled through. 
    */
    const post:PostEntity = {
        postID: String(json.postID),
        userID: String(json.userID),
        word: String(json.word),
        definition: String(json.definition),
        quote: String(json.quote),
        timestamp: new Timestamp(
            (json.timestamp as Timestamp).seconds,
            (json.timestamp as Timestamp).nanoseconds),
        trendscore: Number(json.trendscore),

        tags: StringListFactory.fromExportJson(json.tags), 
        userProfile: UserInfoFactory.fromExportJson(json.userProfile),
        upvotes: StringListFactory.fromExportJson(json.upvotes),
        downvotes: StringListFactory.fromExportJson(json.downvotes),
        shares: StringListFactory.fromExportJson(json.shares),
        flags: StringListFactory.fromExportJson(json.flags),

        upvoteCount: Number(json.upvoteCount),
        downvoteCount: Number(json.downvoteCount),
        shareCount: Number(json.shareCount),
        flagCount: Number(json.flagCount),
    }
    return validatedObject(post, POST_TYPE_ERROR) as PostEntity;
};
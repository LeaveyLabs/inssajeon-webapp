import { Timestamp } from 'firebase/firestore';
import { POST_TYPE_ERROR } from '../../strings/apiConstLibrary';
import { EntityFactory, IDictionary, validatedObject } from '../jsonFormat';
import { UserProfileEntity, UserProfileFactory } from '../users/UserProfileEntity';
import { StringListFactory } from '../StringList';
import { PostMetricsEntity, PostMetricsFactory } from './PostMetricsEntity';

export interface PostEntity extends IDictionary<Object> {
    readonly postID: string;
    readonly userID: string;
    readonly word: string;
    readonly definition: string;
    readonly quote: string;
    readonly timestamp: Timestamp;
    readonly tags: Array<string>;
    readonly metrics: PostMetricsEntity;
    readonly userProfile: UserProfileEntity;
    upvotes: Array<string>;
    downvotes: Array<string>;
    shares: Array<string>;
    flags: Array<string>;
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
        tags: StringListFactory.toExportJson(post.tags),
        metrics: PostMetricsFactory.toExportJson(post.metrics),
        userProfile: UserProfileFactory.toExportJson(post.userProfile),
        upvotes: StringListFactory.toExportJson(post.upvotes),
        downvotes: StringListFactory.toExportJson(post.downvotes),
        shares: StringListFactory.toExportJson(post.shares),
        flags: StringListFactory.toExportJson(post.flags),
    };

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
        tags: StringListFactory.fromExportJson(json.tags), 
        metrics: PostMetricsFactory.fromExportJson(json.metrics),
        userProfile: UserProfileFactory.fromExportJson(json.userProfile),
        upvotes: StringListFactory.fromExportJson(json.upvotes),
        downvotes: StringListFactory.fromExportJson(json.downvotes),
        shares: StringListFactory.fromExportJson(json.shares),
        flags: StringListFactory.fromExportJson(json.flags),
    };
    return validatedObject(post, POST_TYPE_ERROR) as PostEntity;
};
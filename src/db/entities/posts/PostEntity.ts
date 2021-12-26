import { Timestamp } from 'firebase/firestore';
import { POST_TYPE_ERROR } from '../../strings/apiConstLibrary';
import { EntityFactory, IDictionary, validatedObject } from '../jsonFormat';
import { ProfileEntity, ProfileFactory } from '../users/ProfileEntity';
import { UserID, UserIDSet, UserIDSetFactory } from '../users/UserID';
import { PostID } from './PostID';
import { TagSet, TagSetFactory } from './Tag';

export interface PostEntity extends IDictionary<Object> {
    readonly postID: PostID;
    readonly userID: UserID;
    readonly word: string;
    readonly definition: string;
    readonly quote: string;
    readonly timestamp: Timestamp;
    readonly tags: TagSet;
    userProfile: ProfileEntity;
    trendscore: number;
    upvotes: UserIDSet;
    upvoteCount: number;
    downvotes: UserIDSet;
    downvoteCount: number;
    shares: UserIDSet;
    shareCount: number;
    flags: UserIDSet;
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
        postID: post.postID,
        userID: post.userID,
        word: post.word,
        definition: post.definition,
        quote: post.quote,
        timestamp: post.timestamp,
        tags: TagSetFactory.toExportJson(post.tags), 
        userProfile: ProfileFactory.toExportJson(post.userProfile),
        trendscore: post.trendscore,
        upvotes: UserIDSetFactory.toExportJson(post.upvotes),
        upvoteCount: post.upvoteCount,
        downvotes: UserIDSetFactory.toExportJson(post.downvotes),
        downvoteCount: post.downvoteCount,
        shares: UserIDSetFactory.toExportJson(post.shares),
        shareCount: post.shareCount,
        flags: UserIDSetFactory.toExportJson(post.flags),
        flagCount: post.flagCount,
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
        postID: json.postID,
        userID: json.userID,
        word: json.word,
        definition: json.definition,
        quote: json.quote,
        timestamp: json.timestamp,
        tags: TagSetFactory.fromExportJson(json.tags), 
        userProfile: ProfileFactory.fromExportJson(json.userProfile),
        trendscore: json.trendscore,
        upvotes: UserIDSetFactory.fromExportJson(json.upvotes),
        upvoteCount: json.upvoteCount,
        downvotes: UserIDSetFactory.fromExportJson(json.downvotes),
        downvoteCount: json.downvoteCount,
        shares: UserIDSetFactory.fromExportJson(json.shares),
        shareCount: json.shareCount,
        flags: UserIDSetFactory.fromExportJson(json.flags),
        flagCount: json.flagCount,
    }
    return validatedObject(post, POST_TYPE_ERROR) as PostEntity;
};
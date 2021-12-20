import { POST_TYPE_ERROR } from '../../strings/apiStringLibrary';
import { EntityFactory, IDictionary, validatedObject } from '../jsonFormat';
import { Profile, ProfileFactory } from '../users/Profile';
import { UserID } from '../users/UserID';
import { PostID } from './PostID';
import { TagSet, TagSetFactory } from './Tag';

export interface Post extends IDictionary<Object> {
    readonly postID: PostID;
    readonly userID: UserID;
    readonly word: string;
    readonly definition: string;
    readonly quote: string;
    readonly timestamp: Date;
    readonly tags: TagSet;
    userProfile: Profile;
    trendscore: number;
    upvoteCount: number;
    downvoteCount: number;
    shareCount: number;
    flagCount: number;
}

export const PostFactory:EntityFactory = function () {};
/**
 * @param  {Post} post
 * @returns Object
 */
PostFactory.toExportJson = (post:Post) : Object => {
    /* 
    Ensure all data members are in the correct format. 
    Primitives are copied over. 
    Entities are funnelled through. 
    */
    const o:Post = {
        postID: post.postID,
        userID: post.userID,
        word: post.word,
        definition: post.definition,
        quote: post.quote,
        timestamp: post.timestamp, 
        tags: TagSetFactory.toExportJson(post.tags), 
        userProfile: ProfileFactory.toExportJson(post.userProfile),
        trendscore: post.trendscore,
        upvoteCount: post.upvoteCount,
        downvoteCount: post.downvoteCount,
        shareCount: post.shareCount,
        flagCount: post.flagCount,
    }
    return validatedObject(o, POST_TYPE_ERROR);
};

/**
 * @param  {any} json
 * @returns Post
 */
PostFactory.fromExportJson = (json:any) : Post => {
    /* 
    Ensure all data members are in the correct format. 
    Primitives are copied over. 
    Entities are funnelled through. 
    */
    const post:Post = {
        postID: json.postID,
        userID: json.userID,
        word: json.word,
        definition: json.definition,
        quote: json.quote,
        timestamp: json.timestamp, 
        tags: TagSetFactory.fromExportJson(json.tags), 
        userProfile: ProfileFactory.fromExportJson(json.userProfile),
        trendscore: json.trendscore,
        upvoteCount: json.upvoteCount,
        downvoteCount: json.downvoteCount,
        shareCount: json.shareCount,
        flagCount: json.flagCount,
    }
    return validatedObject(post, POST_TYPE_ERROR) as Post;
};
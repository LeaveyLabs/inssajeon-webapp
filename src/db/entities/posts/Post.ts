import { POST_TYPE_ERROR } from '../../strings/apiStringLibrary';
import { EntityFactory } from '../jsonFormat';
import { Profile, ProfileFactory } from '../users/Profile';
import { UserID, UserIDSet, UserIDSetFactory } from '../users/UserID';
import { PostID } from './PostID';
import { TagSet } from './Tag';

export interface Post {
    readonly postID: PostID;
    readonly userID: UserID;
    readonly word: string;
    readonly definition: string;
    readonly quote: string;
    readonly timestamp: Date;
    readonly tags: TagSet;
    userProfile: Profile;
    trendscore: number;
    upvotes: UserIDSet;
    downvotes: UserIDSet;
    shares: UserIDSet;
    flags: UserIDSet;
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
    return {
        postID: post.postID,
        userID: post.userID,
        word: post.word,
        definition: post.definition,
        quote: post.quote,
        timestamp: post.timestamp, 
        tags: post.tags, 
        userProfile: ProfileFactory.toExportJson(post.userProfile),
        trendscore: post.trendscore,
        upvotes: UserIDSetFactory.toExportJson(post.upvotes),
        downvotes: UserIDSetFactory.toExportJson(post.downvotes),
        shares: UserIDSetFactory.toExportJson(post.shares),
        flags: UserIDSetFactory.toExportJson(post.flags),
    };
};

/**
 * @param  {any} json
 * @returns Post
 */
PostFactory.fromExportJson = (json:any) : Post | null => {
    try {
        /* 
        Ensure all data members are in the correct format. 
        Primitives are copied over. 
        Entities are funnelled through. 
        */
        return {
            postID: json.postID,
            userID: json.userID,
            word: json.word,
            definition: json.definition,
            quote: json.quote,
            timestamp: json.timestamp, 
            tags: json.tags, 
            userProfile: ProfileFactory.fromExportJson(json.userProfile),
            trendscore: json.trendscore,
            upvotes: UserIDSetFactory.fromExportJson(json.upvotes),
            downvotes: UserIDSetFactory.fromExportJson(json.downvotes),
            shares: UserIDSetFactory.fromExportJson(json.shares),
            flags: UserIDSetFactory.fromExportJson(json.flags),
        }
    }
    catch (e) {
        /* 
        If conversion fails, then type error!
        */
        console.log(TypeError(POST_TYPE_ERROR));
        console.log(e.stack);
    }
    return null;
};
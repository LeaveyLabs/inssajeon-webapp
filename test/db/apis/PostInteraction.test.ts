import { DataQuery } from "../../../src/db/apis/DataQuery";
import { PostInteraction } from "../../../src/db/apis/PostInteraction";
import { ProfileInteraction } from "../../../src/db/apis/ProfileInteraction";
import { PostEntity } from "../../../src/db/entities/posts/PostEntity";
import { UserProfileEntity } from "../../../src/db/entities/users/UserProfileEntity";
import { createRandomPost, createRandomUserInfo } from "../entities/entityCreation";
import { UserEntity } from "../../../src/db/entities/users/UserEntity";

describe("testing PostInteraction", () => {
    it("create a post and then delete it", async () : Promise<void> => {
        const post:PostEntity = createRandomPost();

        await PostInteraction.createPost(post.postID, post);
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(1);

        try { await PostInteraction.removePost(post.postID); } 
        catch { }
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(0);
    });
    it("create a post, add it to someone's activity, and then delete it", async () : Promise<void> => {
        const post:PostEntity = createRandomPost();

        try { await PostInteraction.createPost(post.postID, post); } 
        catch {}
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(1);

        const info:UserProfileEntity = createRandomUserInfo();
        await ProfileInteraction.createAccount(info, info.username);
        await PostInteraction.upvotePost(info.username, post.postID);

        try { await PostInteraction.removePost(post.postID); } 
        catch { }
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(0);
        const upvotedUser:UserEntity = (await DataQuery.searchUserByUserID(info.username))[0];
        expect(upvotedUser.activity.upvotes).not.toContain(post.postID);
    });
});
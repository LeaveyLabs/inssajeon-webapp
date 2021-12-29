import { DataQuery } from "../../../src/db/apis/DataQuery";
import { PostInteraction } from "../../../src/db/apis/PostInteraction";
import { ProfileInteraction } from "../../../src/db/apis/ProfileInteraction";
import { PostEntity } from "../../../src/db/entities/posts/PostEntity";
import { UserInfoEntity } from "../../../src/db/entities/users/UserInfoEntity";
import { createRandomPost, createRandomUser, createRandomUserInfo } from "../entities/entityCreation";
import { UserEntity } from "../../../src/db/entities/users/UserEntity";

describe("testing PostInteraction", () => {
    it("create a post and then delete it", async () : Promise<void> => {
        const post:PostEntity = createRandomPost();

        await PostInteraction.createPost(post.postID, post);
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(1);

        await PostInteraction.removePost(post.postID);
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(0);
    });
    it("create a post, add it to someone's activity, and then delete it", async () : Promise<void> => {
        const post:PostEntity = createRandomPost();

        await PostInteraction.createPost(post.postID, post);
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(1);

        const info:UserInfoEntity = createRandomUserInfo();
        await ProfileInteraction.createProfile(info, info.username);
        await PostInteraction.upvotePost(info.username, post.postID);

        await PostInteraction.removePost(post.postID);
        expect((await DataQuery.searchPostByPostID(post.postID)).length).toBe(0);
        const upvotedUser:UserEntity = (await DataQuery.searchUserByUserID(info.username))[0];
        expect(upvotedUser.activity.upvotes).not.toContain(post.postID);
    });
});
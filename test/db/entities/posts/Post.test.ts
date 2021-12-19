import { Post, PostFactory } from "../../../../src/db/entities/posts/Post";
import { Tag } from "../../../../src/db/entities/posts/Tag";
import { Profile, ProfileFactory } from "../../../../src/db/entities/users/Profile";
import { UserID } from "../../../../src/db/entities/users/UserID";
import { PROFILE_TYPE_ERROR } from "../../../../src/db/strings/apiStringLibrary";
import { standardPost } from "../basicTestEntities";


/* toExportJson */
describe("testing toExportJson", () => {

    it("empty set: {} -> {}", () => {
        let a = { "bio": 3};
        let b = null;
        expect(ProfileFactory.fromExportJson(a)).toThrowError(
            new TypeError(PROFILE_TYPE_ERROR));
    });

    it("valid post: post -> post", () => {
        let a = standardPost;
        let b = standardPost;
        expect(PostFactory.fromExportJson(standardPost)).toStrictEqual(standardPost);
    });
    // Missing Parameters
    // Export -> Modify User -> Export
    // toExportJson inverts fromExportJson
});

/* fromExportJson */
describe("testing fromExportJson", () => {
    // Empty Object
    // Missing Parameters
    // Object with Other Parameters
    // Export -> Modify Object -> Export
    // fromExportJson inverts toExportJson 
});

/* toExportJson */
describe("testing toExportJson", () => {
    // Default Case
    // Malformed Profile
    // Malformed Upvotes
    // toExportJson inverts fromExportJson
});

/* fromExportJson */
describe("testing fromExportJson", () => {
    // Empty Object
    // NULL Elements
        // NULL postID
        // NULL userID
        // NULL word
        // NULL definition
        // NULL quote
        // NULL timestamp
        // NULL tags
        // NULL userProfile
        // NULL trendscore
        // NULL upvotes
        // NULL downvotes
        // NULL shares
        // NULL flags
    // Invalid userProfile element (within Profile)
    // Invalid upvotes element (within UserIDSet)
    // Object with Other Parameters
    // fromExportJson inverts toExportJson 
});
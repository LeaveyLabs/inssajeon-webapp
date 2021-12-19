import { PostFactory } from "../../../../src/db/entities/posts/Post";

/* Post */
describe("testing Post", () => {
    // Try to write to readonly member
});

/* toExportJson */
describe("testing toExportJson", () => {
    // Empty Set
    // Default Case
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
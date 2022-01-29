import { ProfileInteraction } from "../../../src/db/apis/ProfileInteraction";
import { UserProfileEntity } from "../../../src/db/entities/users/UserProfileEntity";
import { DataQuery, ProfileOrder } from "../../../src/db/apis/DataQuery";

describe("testing ProfileInteraction", () => {
    it("creating and deleting the same profile", async () : Promise<void> => {
        const profileToUpload:UserProfileEntity = {
            username: "test",
            bio: "a",
            picPath: "images/v.png",
        };
        await ProfileInteraction.createAccount(profileToUpload, profileToUpload.username);
        expect((await DataQuery
            .searchUserByUserProfile(profileToUpload, ProfileOrder.Alphabetical))
            .length).toBe(1);
        await ProfileInteraction.deleteAccount(profileToUpload.username);
        expect((await DataQuery
            .searchUserByUserProfile(profileToUpload, ProfileOrder.Alphabetical))
            .length).toBe(0);
    });
    it("creating and setting the same profile", async () : Promise<void> => {
        const profileToUpload:UserProfileEntity = {
            username: "testEntity1",
            bio: "a",
            picPath: "images/v.png"
        };
        await ProfileInteraction.createAccount(profileToUpload, profileToUpload.username);
        expect((await DataQuery
            .searchUserByUserProfile(profileToUpload, ProfileOrder.Alphabetical))
            .length).toBe(1);
        const newProfile:UserProfileEntity = {
            username: "testEntity2",
            bio: "b",
            picPath: "images/c.png",
        };
        await ProfileInteraction.setUsername(profileToUpload.username, 
            newProfile.username);
        await ProfileInteraction.setBio(profileToUpload.username, 
            newProfile.bio);
        await ProfileInteraction.setPic(profileToUpload.username, 
            newProfile.picPath);
        expect((await DataQuery
            .searchUserByUserProfile(profileToUpload, ProfileOrder.Alphabetical))
            .length).toBe(0);
        expect((await DataQuery
            .searchUserByUserProfile(newProfile, ProfileOrder.Alphabetical))
            .length).toBe(1);
        await ProfileInteraction.deleteAccount(profileToUpload.username);
    });
});
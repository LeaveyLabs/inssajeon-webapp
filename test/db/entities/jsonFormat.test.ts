import {Entity, IndexedStringSet, stringSetToJson,
jsonToStringSet, IndexedEntitySet, EntityFactory,
entitySetToJson, jsonToEntitySet, hasNullProperties, validatedObject} from "../../../src/db/entities/jsonFormat";
import { Post, PostFactory } from "../../../src/db/entities/posts/Post";
import { PostID, PostIDSet } from "../../../src/db/entities/posts/PostID";
import { Tag } from "../../../src/db/entities/posts/Tag";
import { Account, AccountFactory } from "../../../src/db/entities/users/Account";
import { Activity, ActivityFactory } from "../../../src/db/entities/users/Activity";
import { Profile, ProfileFactory } from "../../../src/db/entities/users/Profile";
import { User, UserFactory } from "../../../src/db/entities/users/User";
import { Word, WordFactory } from "../../../src/db/entities/words/Word";
import { USER_TYPE_ERROR } from "../../../src/db/strings/apiStringLibrary";
import { jsonAccount, jsonActivity, jsonPost, jsonPostIDSet, jsonProfile, jsonTagSet, jsonUser, jsonUserIDSet, jsonWord, standardAccount, standardActivity, standardPost, standardPostID, standardPostIDSet, standardProfile, standardTagSet, standardUser, standardUserID, standardUserIDSet, standardWord } from "./basicTestEntities";

/* stringSetToJson */
describe("testing stringSetToJson", () => {
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<string>();
        expect(stringSetToJson(b)).toStrictEqual(a);
    });

    it("numbers: {'1', '2', '3'} -> {'0':'1', '1':'2', '2':'3'}", () => {
        let a = { '0':'1', '1':'2', '2':'3' };
        let b = new Set(['1', '2', '3']);
        expect(stringSetToJson(b)).toStrictEqual(a);
    });

    it("names: {'John', 'Adam', 'Brah'} -> {'0':'John', '1':'Adam', '2':'Brah'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(stringSetToJson(b)).toStrictEqual(a);
    });

    it("special characters: {'#1', '@', '^'} -> {'0':'#1', '1':'@', '2':'^'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(stringSetToJson(b)).toStrictEqual(a);
    });
});

/* jsonToStringSet */
describe("testing jsonToStringSet", () => {
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<string>();
        expect(b).toStrictEqual(jsonToStringSet(a));
    });

    it("numbers: {'1', '2', '3'} -> {'0':'1', '1':'2', '2':'3'}", () => {
        let a = { '0':'1', '1':'2', '2':'3' };
        let b = new Set(['1', '2', '3']);
        expect(b).toStrictEqual(jsonToStringSet(a));
    });

    it("names: {'John', 'Adam', 'Brah'} -> {'0':'John', '1':'Adam', '2':'Brah'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(b).toStrictEqual(jsonToStringSet(a));
    });

    it("special characters: {'#1', '@', '^'} -> {'0':'#1', '1':'@', '2':'^'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(b).toStrictEqual(jsonToStringSet(a));
    });
});

/* entitySetToJson */
/* note: PostIDSet, UserIDSet, and TagSet are string sets, and tested above.*/
describe("testing entitySetToJson", () => {
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<Entity>();
        expect(entitySetToJson(b, UserFactory)).toStrictEqual(a);
    });
    it("account: {acc1, acc2} -> {0:acc1, 1:acc2}", () => {
        /* Initialize a set of regular Account objects*/
        let acc1 = standardAccount;
        let acc2 = {
            signInMethod: 10,
            emailFrequency: 30,
        };
        let accSet = new Set<Account>([acc1, acc2]);
        /* Initialize a set of json Account objects */
        let jsonAcc1 = {
            signInMethod: 10,
            emailFrequency: 5,
        };
        let jsonAcc2 = {
            signInMethod: 10,
            emailFrequency: 30,
        };
        let jsonAccs = {
            0: jsonAcc1,
            1: jsonAcc2,
        }
        expect(entitySetToJson(accSet, AccountFactory)).toStrictEqual(jsonAccs);
    });
    it("activity: {act1, act2} -> {0:act1, 1:act2}", () => {
        /* Initialize a set of regular Activity objects */
        let act1 = standardActivity;
        let act2 = {
            upvotes: standardPostIDSet,
            downvotes: standardPostIDSet,
            favorites: new Set<PostID>([standardPostID]),
            submissions: standardPostIDSet,
            lastLogin: act1.lastLogin,
        };
        let actSet = new Set<Activity>([act1, act2]);
        /* Initialize a set of json Activity objects */
        let jsonAct1 = jsonActivity;
        let jsonAct2 = {
            upvotes: jsonPostIDSet,
            downvotes: jsonPostIDSet,
            favorites: {0: standardPostID},
            submissions: jsonPostIDSet,
            lastLogin: act1.lastLogin,
        };
        let jsonActs = {
            0: jsonAct1, 
            1: jsonAct2,
        };
        expect(entitySetToJson(actSet, ActivityFactory)).toStrictEqual(jsonActs);
    });
    it("user: {act1, act2} -> {0:act1, 1:act2}", () => {
        /* Initialize a set of regular User objects */
        let user1 = standardUser;
        let user2 = {
            id: standardUserID,
            info: standardProfile,
            activity: {
                upvotes: standardPostIDSet,
                downvotes: standardPostIDSet,
                favorites: new Set<PostID>([standardPostID]),
                submissions: standardPostIDSet,
                lastLogin: user1.activity.lastLogin,
            },
            account: standardAccount,
        };
        let userSet = new Set<User>([user1, user2]);
        /* Initialize a set of json User objects */
        let jsonUser1 = {
            id: standardUserID,
            info: jsonProfile,
            activity: jsonActivity,
            account: jsonAccount,
        };
        let jsonUser2 = {
            id: standardUserID,
            info: jsonProfile,
            activity: {
                upvotes: jsonPostIDSet,
                downvotes: jsonPostIDSet,
                favorites: {0: standardPostID},
                submissions: jsonPostIDSet,
                lastLogin: user1.activity.lastLogin,
            },
            account: jsonAccount,
        };
        let jsonUsers = {
            0: jsonUser1,
            1: jsonUser2,
        }
        /* Compare */
        expect(entitySetToJson(userSet, UserFactory)).toStrictEqual(jsonUsers);
    });
    it("post: {post1, post2} -> {0:post1, 1:post2}", () => {
        /* Initialize a set of regular Post objects */
        /* Initialize a set of regular User objects */
        let post1 = standardPost;
        let post2 = {
            postID: "1",
            userID:"2",
            word:"3",
            definition:"4",
            quote:"5",
            timestamp: post1.timestamp,
            tags: new Set<Tag>(["a", "b"]),
            userProfile: standardProfile,
            trendscore: 15,
            upvoteCount: 0,
            downvoteCount: 0,
            shareCount: 0,
            flagCount: 0,
        };
        let postSet = new Set<Post>([post1, post2]);
        /* Initialize a set of JSON Post objects */
        let jsonPost1 = jsonPost;
        let jsonPost2 = {
            postID: "1",
            userID:"2",
            word:"3",
            definition:"4",
            quote:"5",
            timestamp: post1.timestamp,
            tags: {0: "a", 1:"b"},
            userProfile: jsonProfile,
            trendscore: 15,
            upvoteCount: 0,
            downvoteCount: 0,
            shareCount: 0,
            flagCount: 0,
        };
        let jsonPosts = {
            0: jsonPost1,
            1: jsonPost2,
        }
        /* Compare */
        expect(entitySetToJson(postSet, PostFactory)).toStrictEqual(jsonPosts);
    });
    it("profile: {profile1, profile2} -> {0:profile1, 1:profile2}", () => {
        /* Initialize a set of standard Profile objects */
        let profile1 = standardProfile;
        let profile2 = {
            username: "a",
            bio: "b",
            picPath: "c",
            inssajeom: 15,
        };
        let profileSet = new Set<Profile>([profile1, profile2]);
        /* Initialize a set of json Profile objects */
        let jsonProfile1 = jsonProfile;
        let jsonProfile2 = {
            username: "a",
            bio: "b",
            picPath: "c",
            inssajeom: 15,
        };
        let jsonProfiles = {
            0: jsonProfile1,
            1: jsonProfile2,
        }
        expect(entitySetToJson(profileSet, ProfileFactory)).toStrictEqual(jsonProfiles);
    });
    it("word: {word1, word2} -> {0:word1, 1:word2}", () => {
        /* Initialize a set of standard Word objects */
        let word1 = standardWord;
        let word2 = {
            wordString: "견박",
            wordPosts: standardPostIDSet,
            trendscore: 15,
        };
        let wordSet = new Set<Word>([word1, word2]);
        /* Initialize a set of json Word objects */
        let jsonWord1 = jsonWord;
        let jsonWord2 = {
            wordString: "견박",
            wordPosts: jsonPostIDSet,
            trendscore: 15,
        };
        let jsonWords = {
            0: jsonWord1,
            1: jsonWord2,
        };
        expect(entitySetToJson(wordSet, WordFactory)).toStrictEqual(jsonWords);
    });
});

/* jsonToEntitySet */
/* note: PostIDSet, UserIDSet, and TagSet are string sets, and tested above.*/
describe("testing jsonToEntitySet", () => {
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<Entity>();
        expect(jsonToEntitySet(a, UserFactory)).toStrictEqual(b);
    });
    it("account: {acc1, acc2} <- {0:acc1, 1:acc2}", () => {
        /* Initialize a set of regular Account objects*/
        let acc1 = standardAccount;
        let acc2 = {
            signInMethod: 10,
            emailFrequency: 30,
        };
        let accSet = new Set<Account>([acc1, acc2]);
        /* Initialize a set of json Account objects */
        let jsonAcc1 = {
            signInMethod: 10,
            emailFrequency: 5,
        };
        let jsonAcc2 = {
            signInMethod: 10,
            emailFrequency: 30,
        };
        let jsonAccs = {
            0: jsonAcc1,
            1: jsonAcc2,
        }
        expect(jsonToEntitySet(jsonAccs, AccountFactory)).toStrictEqual(accSet);
    });
    it("activity: {act1, act2} -> {0:act1, 1:act2}", () => {
        /* Initialize a set of regular Activity objects */
        let act1 = standardActivity;
        let act2 = {
            upvotes: standardPostIDSet,
            downvotes: standardPostIDSet,
            favorites: new Set<PostID>([standardPostID]),
            submissions: standardPostIDSet,
            lastLogin: act1.lastLogin,
        };
        let actSet = new Set<Activity>([act1, act2]);
        /* Initialize a set of json Activity objects */
        let jsonAct1 = jsonActivity;
        let jsonAct2 = {
            upvotes: jsonPostIDSet,
            downvotes: jsonPostIDSet,
            favorites: {0: standardPostID},
            submissions: jsonPostIDSet,
            lastLogin: act1.lastLogin,
        };
        let jsonActs = {
            0: jsonAct1, 
            1: jsonAct2,
        };
        expect(jsonToEntitySet(jsonActs, ActivityFactory)).toStrictEqual(actSet);
    });
    it("user: {act1, act2} -> {0:act1, 1:act2}", () => {
        /* Initialize a set of regular User objects */
        let user1 = standardUser;
        let user2 = {
            id: standardUserID,
            info: standardProfile,
            activity: {
                upvotes: standardPostIDSet,
                downvotes: standardPostIDSet,
                favorites: new Set<PostID>([standardPostID]),
                submissions: standardPostIDSet,
                lastLogin: user1.activity.lastLogin,
            },
            account: standardAccount,
        };
        let userSet = new Set<User>([user1, user2]);
        /* Initialize a set of json User objects */
        let jsonUser1 = {
            id: standardUserID,
            info: jsonProfile,
            activity: jsonActivity,
            account: jsonAccount,
        };
        let jsonUser2 = {
            id: standardUserID,
            info: jsonProfile,
            activity: {
                upvotes: jsonPostIDSet,
                downvotes: jsonPostIDSet,
                favorites: {0: standardPostID},
                submissions: jsonPostIDSet,
                lastLogin: user1.activity.lastLogin,
            },
            account: jsonAccount,
        };
        let jsonUsers = {
            0: jsonUser1,
            1: jsonUser2,
        }
        /* Compare */
        expect(jsonToEntitySet(jsonUsers, UserFactory)).toStrictEqual(userSet);
    });
    it("post: {post1, post2} -> {0:post1, 1:post2}", () => {
        /* Initialize a set of regular Post objects */
        /* Initialize a set of regular User objects */
        let post1 = standardPost;
        let post2 = {
            postID: "1",
            userID:"2",
            word:"3",
            definition:"4",
            quote:"5",
            timestamp: post1.timestamp,
            tags: new Set<Tag>(["a", "b"]),
            userProfile: standardProfile,
            trendscore: 15,
            upvoteCount: 0,
            downvoteCount: 0,
            shareCount: 0,
            flagCount: 0,
        };
        let postSet = new Set<Post>([post1, post2]);
        /* Initialize a set of JSON Post objects */
        let jsonPost1 = jsonPost;
        let jsonPost2 = {
            postID: "1",
            userID:"2",
            word:"3",
            definition:"4",
            quote:"5",
            timestamp: post1.timestamp,
            tags: {0: "a", 1:"b"},
            userProfile: jsonProfile,
            trendscore: 15,
            upvoteCount: 0,
            downvoteCount: 0,
            shareCount: 0,
            flagCount: 0,
        };
        let jsonPosts = {
            0: jsonPost1,
            1: jsonPost2,
        }
        /* Compare */
        expect(jsonToEntitySet(jsonPosts, PostFactory)).toStrictEqual(postSet);
    });
    it("profile: {profile1, profile2} -> {0:profile1, 1:profile2}", () => {
        /* Initialize a set of standard Profile objects */
        let profile1 = standardProfile;
        let profile2 = {
            username: "a",
            bio: "b",
            picPath: "c",
            inssajeom: 15,
        };
        let profileSet = new Set<Profile>([profile1, profile2]);
        /* Initialize a set of json Profile objects */
        let jsonProfile1 = jsonProfile;
        let jsonProfile2 = {
            username: "a",
            bio: "b",
            picPath: "c",
            inssajeom: 15,
        };
        let jsonProfiles = {
            0: jsonProfile1,
            1: jsonProfile2,
        }
        expect(jsonToEntitySet(jsonProfiles, ProfileFactory)).toStrictEqual(profileSet);
    });
    it("word: {word1, word2} -> {0:word1, 1:word2}", () => {
        /* Initialize a set of standard Word objects */
        let word1 = standardWord;
        let word2 = {
            wordString: "견박",
            wordPosts: standardPostIDSet,
            trendscore: 15,
        };
        let wordSet = new Set<Word>([word1, word2]);
        /* Initialize a set of json Word objects */
        let jsonWord1 = jsonWord;
        let jsonWord2 = {
            wordString: "견박",
            wordPosts: jsonPostIDSet,
            trendscore: 15,
        };
        let jsonWords = {
            0: jsonWord1,
            1: jsonWord2,
        };
        expect(jsonToEntitySet(jsonWords, WordFactory)).toStrictEqual(wordSet);
    });
});


/* hasNullProperties */
describe("testing hasNullProperties", () => {
    it("this empty object should return false", () => {
        expect(hasNullProperties({})).toStrictEqual(false);
    });
    it("this partially empty object should return true", () => {
        expect(hasNullProperties({"a":null, "b":5})).toStrictEqual(true);
    });
    it("this full object should return false", () => {
        expect(hasNullProperties({"a":"4", "b":5})).toStrictEqual(false);
    });
    it("this full object with empty sets should return false", () => {
        expect(hasNullProperties({"a":{}, "b":5})).toStrictEqual(false);
    });
});

/* validatedObject */
describe("testing validatedObject", () => {
    it("this empty object should return {}", () => {
        expect(validatedObject({}, USER_TYPE_ERROR)).toStrictEqual({});
    });
    it("this partially empty object should throw a type error", () => {
        const functionToThrow = () => validatedObject({"a":null, "b":5}, USER_TYPE_ERROR);
        expect(functionToThrow).toThrow(new TypeError(USER_TYPE_ERROR));
    });
    it("this full object should return the same object", () => {
        expect(validatedObject({"a":"4", "b":5}, USER_TYPE_ERROR)).toStrictEqual({"a":"4", "b":5});
    });
    it("this full object with empty sets should return the same object", () => {
        expect(validatedObject({"a":{}, "b":5}, USER_TYPE_ERROR)).toStrictEqual({"a":{}, "b":5});
    });
});
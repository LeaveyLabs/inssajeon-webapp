import { Post } from "../../../src/db/entities/posts/Post";
import { Tag, TagSet } from "../../../src/db/entities/posts/Tag";
import { Account } from "../../../src/db/entities/users/Account";
import { Activity } from "../../../src/db/entities/users/Activity";
import { Profile } from "../../../src/db/entities/users/Profile";
import { UserID, UserIDSet} from "../../../src/db/entities/users/UserID";
import { User } from "../../../src/db/entities/users/User";
import { PostID, PostIDSet } from "../../../src/db/entities/posts/PostID";
import { Word } from "../../../src/db/entities/words/Word";
import { Timestamp } from "firebase/firestore";

export const standardUserID:UserID = "aaaaabbyzhs12345";

export const standardUserIDSet:UserIDSet = [];
export const jsonUserIDSet:Object = [];

export const standardPostID:PostID = "aaaaabbyzhs12345";

export const standardPostIDSet:PostIDSet = [];
export const jsonPostIDSet:Object = [];

export const standardTag:Tag = "#yolodude"

export const standardTagSet:TagSet = [];
export const jsonTagSet:Object = [];

export const time = Timestamp.fromDate(new Date());

/* Account */
export const standardAccount:Account = {
    signInMethod: 10,
    emailFrequency: 5,
};

export const jsonAccount:Object = {
    signInMethod: 10,
    emailFrequency: 5,
};

export const standardActivity:Activity = {
    upvotes: standardPostIDSet,
    downvotes: standardPostIDSet,
    favorites: standardPostIDSet,
    submissions: standardPostIDSet,
    lastLogin: time,
};

export const jsonActivity:Object = {
    upvotes: jsonPostIDSet,
    downvotes: jsonPostIDSet,
    favorites: jsonPostIDSet,
    submissions: jsonPostIDSet,
    lastLogin: time,
};

export const standardProfile:Profile = {
    username: "adamNovak15",
    bio: "A little bit about me: I am most interested in the realm of human-centered technology and how designers and engineers can be more thoughtful of the humanness of the user of their technology.",
    picPath: "c",
    inssajeom: 5,
};

export const jsonProfile:Object = {
    username: "adamNovak15",
    bio: "A little bit about me: I am most interested in the realm of human-centered technology and how designers and engineers can be more thoughtful of the humanness of the user of their technology.",
    picPath: "c",
    inssajeom: 5,
};

export const standardPost:Post = {
    postID: "1",
    userID: "2",
    word: "갑분사",
    definition: "ㅋㅋㅋㅋ",
    quote: "ㅋㅋㅋㅋㅋㅋ",
    timestamp: time,
    tags: standardTagSet,
    userProfile: standardProfile,
    trendscore: 10,
    upvoteCount: 0,
    downvoteCount: 0, 
    shareCount: 0, 
    flagCount: 0, 
};

export const jsonPost = {
    postID: "1",
    userID: "2",
    word: "갑분사",
    definition: "ㅋㅋㅋㅋ",
    quote: "ㅋㅋㅋㅋㅋㅋ",
    timestamp: time,
    tags: jsonTagSet,
    userProfile: jsonProfile,
    trendscore: 10,
    upvoteCount: 0,
    downvoteCount: 0, 
    shareCount: 0, 
    flagCount: 0, 
};

export const standardUser:User = {
    id: standardUserID,
    info: standardProfile,
    activity: standardActivity,
    account: standardAccount,
};

export const jsonUser:Object = {
    id: standardUserID,
    info: jsonProfile,
    activity: jsonActivity,
    account: jsonAccount,
};

export const standardWord:Word = {
    wordString: "견박",
    wordPosts: standardPostIDSet,
    trendscore: 10,
};

export const jsonWord:Object = {
    wordString: "견박",
    wordPosts: jsonPostIDSet,
    trendscore: 10,
};

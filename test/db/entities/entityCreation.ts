import { Timestamp } from "@firebase/firestore";
import { PostEntity } from "../../../src/db/entities/posts/PostEntity";
import { WordEntity } from "../../../src/db/entities/words/WordEntity";
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from "../../../src/db/entities/users/UserEntity";
import { TagEntity } from "../../../src/db/entities/tags/TagEntity";
import { UserInfoEntity } from "../../../src/db/entities/users/UserInfoEntity";
import { UserActivityEntity } from "../../../src/db/entities/users/UserActivityEntity";
import { AccountEntity } from "../../../src/db/entities/users/AccountEntity";

export function createRandomTag() : TagEntity {
    return {
        tagString: String(uuidv4()).replace("-", ""),
        numberOfPosts: Math.random()*10, 
        trendscore: Math.random()*10,
    };
}

export function createRandomWord() : WordEntity {
    return {
        wordString: String(uuidv4()).replace("-", ""),
        numberOfPosts: Math.random()*10, 
        trendscore: Math.random()*10,
    };
}

export function createRandomUserInfo() : UserInfoEntity {
    return {
        username: String(uuidv4()).replace("-", ""),
        bio: String(uuidv4()).replace("-", ""),
        picPath: String(uuidv4()).replace("-", ""),
        inssajeom: Math.random()*100,
    };
}

export function createRandomUserActivity() : UserActivityEntity {
    let upvotes:Array<string> = [];
    let downvotes:Array<string> = [];
    let submissions:Array<string> = [];
    let favorites:Array<string> = [];
    let arrayGauntlet = [upvotes, downvotes, submissions, favorites];
    for(let i = 0; i < arrayGauntlet.length; ++i) {
        for(let j = 0; j < Math.random()*10; ++j) {
            arrayGauntlet[i].push(String(uuidv4()).replace("-", ""));
        }
    }
    return {
        upvotes: arrayGauntlet[0],
        downvotes: arrayGauntlet[1],
        submissions: arrayGauntlet[2],
        favorites: arrayGauntlet[3],
        lastLogin: Timestamp.fromDate(new Date()),
    };
}

export function createRandomAccount() : AccountEntity {
    return {
        signInMethod: Math.random()*10,
        emailFrequency: Math.random()*10,
    }
}

export function createRandomUser() : UserEntity {
    return createRandomUserWithID(String(uuidv4()).replace("-", ""));
}

export function createRandomUserWithID(userID:string) : UserEntity {
    return {
        id: userID,
        info: createRandomUserInfo(),
        activity: createRandomUserActivity(),
        account: createRandomAccount(),
    }
}

export function createRandomPost() : PostEntity {
    return createRandomPostWithID(String(uuidv4()).replace("-", ""), String(uuidv4()).replace("-", ""),);
}

export function createRandomPostWithID(postID:string, userID:string) : PostEntity {
    let tags:Array<string> = []
    let upvotes:Array<string> = [];
    let downvotes:Array<string> = [];
    let shares:Array<string> = [];
    let flags:Array<string> = [];
    let arrayGauntlet = [tags, upvotes, downvotes, shares, flags];
    for(let i = 0; i < arrayGauntlet.length; ++i) {
        for(let j = 0; j < Math.random()*3; ++j) {
            arrayGauntlet[i].push(String(uuidv4()).replace("-", ""));
        }
    }
    return {
        postID: postID,
        userID: userID,
        word: String(uuidv4()).replace("-", ""),
        definition: String(uuidv4()).replace("-", ""),
        quote: String(uuidv4()).replace("-", ""),
        timestamp: Timestamp.fromDate(new Date()),
        tags: arrayGauntlet[0],
        userProfile: createRandomUserInfo(),
        trendscore: Math.random()*10,
        upvotes: arrayGauntlet[1],
        upvoteCount: arrayGauntlet[1].length,
        downvotes: arrayGauntlet[2],
        downvoteCount: arrayGauntlet[2].length,
        shares: arrayGauntlet[3],
        shareCount: arrayGauntlet[3].length,
        flags: arrayGauntlet[4],
        flagCount: arrayGauntlet[4].length,
    }
}

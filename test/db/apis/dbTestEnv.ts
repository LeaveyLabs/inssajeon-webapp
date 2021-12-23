import { standardAccount, standardActivity, standardProfile, standardUser, standardUserID } from "../entities/basicTestEntities";
import { UserEntity } from "../../../src/db/entities/users/UserEntity"
import { PostEntity } from "../../../src/db/entities/posts/PostEntity";
import { WordEntity } from "../../../src/db/entities/words/WordEntity";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc, Timestamp } from "firebase/firestore"; 
import { postDatabase, userDatabase, wordDatabase } from "../../../src/db/apis/dbRefs";

export interface Verifier {
    users: Set<UserEntity>,
    posts: Set<PostEntity>,
    words: Set<WordEntity>,
}

export type VerifierFunction = (v:Verifier) => Promise<any>;

export const executeInDatabase = async (testFunc:VerifierFunction) : Promise<void> => {
    /* 
    Define Users 
    */
    const user1:UserEntity = {
        id: "1",
        info: {
            username: "adamNovak15",
            bio: "A little bit about me: I am most interested in the realm of human-centered technology and how designers and engineers can be more thoughtful of the humanness of the user of their technology.",
            picPath: "c",
            inssajeom: 5,
        },
        activity: {
            upvotes: ["1", "3"],
            downvotes: [],
            favorites: [],
            submissions: ["1", "2"],
            lastLogin: Timestamp.fromDate(new Date()),
        },
        account: standardAccount,
    };
    const user2:UserEntity = {
        id: "2",
        info: {
            username: "kevin",
            bio: "hey! i'm kevin (:",
            picPath: "kev.png",
            inssajeom: 14,
        },
        activity: {
            upvotes: ["3"],
            downvotes: ["2"],
            favorites: [],
            submissions: ["3"],
            lastLogin: Timestamp.fromDate(new Date()),
        },
        account: standardAccount,
    };
    const user3:UserEntity = {
        id: "3",
        info: {
            username: "rahul",
            bio: "hey! i'm rahul (:",
            picPath: "rahul.png",
            inssajeom: 25,
        },
        activity: {
            upvotes: ["3"],
            downvotes: [],
            favorites: [],
            submissions: ["4"],
            lastLogin: Timestamp.fromDate(new Date()),
        },
        account: standardAccount,
    };
    const user4:UserEntity = {
        id: "4",
        info: {
            username: "erica",
            bio: "erica! nice to meet you.",
            picPath: "erica.png",
            inssajeom: 30,
        },
        activity: {
            upvotes: [],
            downvotes: [],
            favorites: [],
            submissions: [],
            lastLogin: Timestamp.fromDate(new Date()),
        },
        account: standardAccount,
    };
    const user5:UserEntity = {
        id: "5",
        info: {
            username: "alex",
            bio: "alex! nice to meet you.",
            picPath: "alex.png",
            inssajeom: 35,
        },
        activity: {
            upvotes: [],
            downvotes: [],
            favorites: [],
            submissions: ["5"],
            lastLogin: Timestamp.fromDate(new Date()),
        },
        account: standardAccount,
    };
    const userSet:Set<UserEntity> = new Set<UserEntity>([user1, user2, 
        user3, user4, user5]);
    /* 
    Define Posts 
    */
    const post1:PostEntity = {
        postID: "1",
        userID: "1",
        word: "갑분사",
        definition: "ㅋㅋㅋㅋㅋ",
        quote: "ㅋㅋㅋㅋㅋ",
        timestamp: Timestamp.fromDate(new Date()),
        tags: ["#YOLO"],
        userProfile: user1.info,
        trendscore: 15,
        upvotes: ["1"],
        downvotes: [],
        shares: [],
        flags: [],
    }
    const post2:PostEntity = {
        postID: "2",
        userID: "1",
        word: "갑분사",
        definition: "ㅋㅋㅋㅋㅋ",
        quote: "ㅋㅋㅋㅋㅋ",
        timestamp: Timestamp.fromDate(new Date()),
        tags: ["#YOLO"],
        userProfile: user1.info,
        trendscore: 15,
        upvotes: [],
        downvotes: ["2"],
        shares: [],
        flags: [],
    }
    const post3:PostEntity = {
        postID: "3",
        userID: "2",
        word: "신조언",
        definition: "helloooo",
        quote: "okie doke!",
        timestamp: Timestamp.fromDate(new Date()),
        tags: ["#OKIE"],
        userProfile: user2.info,
        trendscore: 20,
        upvotes: ["1", "2", "3"],
        downvotes: [],
        shares: [],
        flags: [],
    }
    const post4:PostEntity = {
        postID: "4",
        userID: "3",
        word: "신조언",
        definition: "okie dokeeee",
        quote: "fo sho",
        timestamp: Timestamp.fromDate(new Date()),
        tags: [],
        userProfile: user3.info,
        trendscore: 5,
        upvotes: [],
        downvotes: [],
        shares: [],
        flags: [],
    }
    const post5:PostEntity = {
        postID: "5",
        userID: "5",
        word: "신조언",
        definition: "hello!",
        quote: "testing testing",
        timestamp: Timestamp.fromDate(new Date()),
        tags: ["#okie"],
        userProfile: user4.info,
        trendscore: 5,
        upvotes: [],
        downvotes: [],
        shares: [],
        flags: [],
    }
    const postSet = new Set<PostEntity>([post1, post2, post3, post4, post5]);
    /* 
    Define Words 
    */
    const word1:WordEntity = {
        wordString: "갑분사",
        wordPosts: ["1", "2"],
        trendscore: 10,
    }
    const word2:WordEntity = {
        wordString: "신조언",
        wordPosts: ["3", "4", "5"],
        trendscore: 30,
    }
    const wordSet = new Set<WordEntity>([word1, word2]);
    /* 
    Verifier holds each set of Objects. 
    Permits checking through Set operations.
    */
    const verifier:Verifier = {
        users: userSet,
        posts: postSet,
        words: wordSet,
    }
    /*
    Iterable lists of each set
    */
    const userList = Array.from(userSet);
    const postList = Array.from(postSet);
    const wordList = Array.from(wordSet);

    /*
    Upload each set to the database. 
    */
    let i = -1;
    for(const user of userList) {
        await setDoc(doc(userDatabase, String(i--)), user);
    }
    let j = -1;
    for(const post of postList) {
        await setDoc(doc(postDatabase, String(j--)), post);
    }
    let k = -1;
    for(const word of wordList) {
        await setDoc(doc(wordDatabase, String(k--)), word);
    }
    /*
    Run the function in this test environment.
    */
    await testFunc(verifier);
    /*
    Delete each set from the database. 
    */
    for(const user of userList) {
        await deleteDoc(doc(userDatabase, String(++i)));
    }
    for(const post of postList) {
        await deleteDoc(doc(postDatabase, String(++j)));
    }
    for(const word of wordList) {
        await deleteDoc(doc(wordDatabase, String(++k)));
    }
};
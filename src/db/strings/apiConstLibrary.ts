import { AccountEntity } from "../entities/users/AccountEntity";

export const USER_USERID_HEADER = "id";
// export const USER_ACCOUNT_HEADER = "account";
// export const USER_ACTIVITY_HEADER = "activity";
export const USER_PROFILE_HEADER = "info";
export const USER_TYPE_ERROR = "Incorrect formatting of User data.";

export const USERIDSET_TYPE_ERROR = "Incorrect formatting of UserIDSet data.";

// export const ACCOUNT_SIGNINMETHOD_HEADER = "activity";
// export const ACCOUNT_EMAILFREQUENCY_HEADER = "emailFrequency";
export const ACCOUNT_TYPE_ERROR = "Incorrect formatting of Account data.";
export const ACCOUNT_DEFAULT_SETTINGS:AccountEntity = {
    signInMethod: 0, 
    emailFrequency: 1,
}

// export const ACTIVITY_UPVOTES_HEADER = "userUpvotes";
// export const ACTIVITY_FAVORITES_HEADER = "userSubmissions";
// export const ACTIVITY_SUBMISSIONS_HEADER = "userSubmissions";
export const ACTIVITY_TYPE_ERROR = "Incorrect formatting of Activity data.";
export const ACTIVITY_UPVOTE_ERROR = "Could not add an upvote."

// export const PROFILE_USERNAME_HEADER = "username";
// export const PROFILE_BIO_HEADER = "bio";
// export const PROFILE_PIC_PATH_HEADER = "picPath";
// export const PROFILE_INSSAJEOM_HEADER = "innsajeom";
export const PROFILE_TYPE_ERROR = "Incorrect formatting of Profile data.";
export const PROFILE_USER_CREATION_ERROR = "Error in manufacturing a new user from the provided profile information.";
export const PROFILE_USER_DELETION_ERROR = "Error in deleting a user from the provided user id.";
export const PROFILE_USERNAME_UPDATE_ERROR = "Error in updating username.";
export const PROFILE_BIO_UPDATE_ERROR = "Error in updating username.";
export const PROFILE_PIC_UPDATE_ERROR = "Error in updating picture path.";

// export const WORD_HEADER = "word";
export const WORD_WORDSTRING_HEADER = "wordSring";
// export const WORD_WORDPOSTS_HEADER = "wordPosts";
// export const WORD_TRENDSCORES_HEADER = "trendscores"; CLIENT CANNOT ACCESS THIS
// export const WORD_TRENDSCORE_HEADER = "trendscore";
export const WORD_TYPE_ERROR = "Incorrect formatting of Word data."

export const POST_POSTID_HEADER = "postID";
// export const POST_USERID_HEADER = "userID";
// export const POST_WORD_HEADER = "word";
// export const POST_DEFINITION_HEADER = "definition";
// export const POST_QUOTE_HEADER = "quote";
// export const POST_TIMESTAMP_HEADER = "timestamp";
export const POST_TAGS_HEADER = "tags";
// export const POST_USERPROFILE_HEADER = "userProfile";
// export const POST_TRENDSCORE_HEADER = "trendscore";
// export const POST_TRENDSCORES_HEADER = "trendscores"; CLIENT CANNOT ACCESS THIS
// export const POST_UPVOTES_HEADER = "upvotes";
// export const POST_DOWNVOTES_HEADER = "downvotes";
// export const POST_SHARES_HEADER = "shares";
// export const POST_FLAGS_HEADER = "flags";
export const POST_TYPE_ERROR = "Incorrect formatting of Post data.";

export const POSTIDSET_TYPE_ERROR = "Incorrect formatting of PostIDSet data.";

export const TAGSET_TYPE_ERROR = "Incorrect formatting of TagSet data.";

export const POST_DIR = "posts";
export const USER_DIR = "users";
export const WORD_DIR = "words";
export const IMG_DIR = "images";

export const MAX_IMG_BYTES:number = 10_000_000; /* Maximum bytes is 10MB */
export const MAX_UPLOAD_TIME:number = 20_000; /* Maximum upload is 20 seconds */
export const SUPPORTED_EXT:Array<string> = ["jpg", "jpeg", "png"]
export const IMG_ERROR_UNSUPPORTED_EXT = "Not an image file.";
export const IMG_ERROR_SIZE =`Image size must not exceed ${MAX_IMG_BYTES/1_000_000} megabytes.`;
export const IMG_ERROR_URL = "Firebase storage path could not be converted into an image URL.";

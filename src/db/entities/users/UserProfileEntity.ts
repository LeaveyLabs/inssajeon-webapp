import { PROFILE_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";

/* Holds user's personal profile information */
export interface UserProfileEntity extends IDictionary<Object> {
    username: string;
    bio: string;
    picPath: string;
}

/* Converts between JSON strings and Profile Objects */
export const UserProfileFactory:EntityFactory = function () {};

/**
 * @param  {UserProfileEntity} profile
 * @returns Object
 * @description converts a profile into a database-exportable json object
 */
UserProfileFactory.toExportJson = (profile:UserProfileEntity) : Object => { 
    const json:UserProfileEntity =  {
        username: profile.username, 
        bio: profile.bio,
        picPath: profile.picPath,
    };
    return validatedObject(json, PROFILE_TYPE_ERROR); 
};

/**
 * @param  {any} json
 * @returns Profile
 * @description converts a json string into a profile
 */
UserProfileFactory.fromExportJson = (json:any) : UserProfileEntity => {
    /* 
    Ensure username, bio, and picPath are present.
    */
    const profile:UserProfileEntity =  {
        username: json.username, 
        bio: json.bio,
        picPath: json.picPath,
    };
    return validatedObject(profile, PROFILE_TYPE_ERROR) as UserProfileEntity;
};
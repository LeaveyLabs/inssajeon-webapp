import { PROFILE_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";

/* Holds user's personal profile information */
export interface UserInfoEntity extends IDictionary<Object> {
    username: string;
    bio: string;
    picPath: string;
    inssajeom: number;
}

/* Converts between JSON strings and Profile Objects */
export const UserInfoFactory:EntityFactory = function () {};

/**
 * @param  {UserInfoEntity} profile
 * @returns Object
 * @description converts a profile into a database-exportable json object
 */
UserInfoFactory.toExportJson = (profile:UserInfoEntity) : Object => { 
    const json:UserInfoEntity =  {
        username: profile.username, 
        bio: profile.bio,
        picPath: profile.picPath,
        inssajeom: profile.inssajeom,
    };
    return validatedObject(json, PROFILE_TYPE_ERROR); 
};

/**
 * @param  {any} json
 * @returns Profile
 * @description converts a json string into a profile
 */
UserInfoFactory.fromExportJson = (json:any) : UserInfoEntity => {
    /* 
    Ensure username, bio, picPath, and inssajeom are present.
    */
    const profile:UserInfoEntity =  {
        username: json.username, 
        bio: json.bio,
        picPath: json.picPath,
        inssajeom: json.inssajeom,
    };
    return validatedObject(profile, PROFILE_TYPE_ERROR) as UserInfoEntity;
};
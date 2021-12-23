import { PROFILE_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";

/* Holds user's personal profile information */
export interface ProfileEntity extends IDictionary<Object> {
    username: string;
    bio: string;
    picPath: string;
    inssajeom: number;
}

/* Converts between JSON strings and Profile Objects */
export const ProfileFactory:EntityFactory = function () {};

/**
 * @param  {ProfileEntity} profile
 * @returns Object
 * @description converts a profile into a database-exportable json object
 */
ProfileFactory.toExportJson = (profile:ProfileEntity) : Object => { 
    const json:ProfileEntity =  {
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
ProfileFactory.fromExportJson = (json:any) : ProfileEntity => {
    /* 
    Ensure username, bio, picPath, and inssajeom are present.
    */
    const profile:ProfileEntity =  {
        username: json.username, 
        bio: json.bio,
        picPath: json.picPath,
        inssajeom: json.inssajeom,
    };
    return validatedObject(profile, PROFILE_TYPE_ERROR) as ProfileEntity;
};
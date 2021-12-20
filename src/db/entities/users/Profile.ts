import { PROFILE_TYPE_ERROR } from "../../strings/apiStringLibrary";
import { EntityFactory, validatedObject } from "../jsonFormat";

/* Holds user's personal profile information */
export interface Profile {
    username: string;
    bio: string;
    picPath: string;
    inssajeom: number;
}

/* Converts between JSON strings and Profile Objects */
export const ProfileFactory:EntityFactory = function () {};

/**
 * @param  {Profile} profile
 * @returns Object
 * @description converts a profile into a database-exportable json object
 */
ProfileFactory.toExportJson = (profile:Profile) : Object => { 
    const json:Profile =  {
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
ProfileFactory.fromExportJson = (json:any) : Profile => {
    /* 
    Ensure username, bio, picPath, and inssajeom are present.
    */
    const profile:Profile =  {
        username: json.username, 
        bio: json.bio,
        picPath: json.picPath,
        inssajeom: json.inssajeom,
    };
    return validatedObject(profile, PROFILE_TYPE_ERROR) as Profile;
};
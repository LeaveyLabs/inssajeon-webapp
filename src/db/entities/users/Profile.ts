import { PROFILE_TYPE_ERROR } from "../../strings/apiStringLibrary";
import { EntityFactory } from "../jsonFormat";

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
ProfileFactory.toExportJson = (profile:Profile) : Object => { return profile; };

/**
 * @param  {any} json
 * @returns Profile
 * @description converts a json string into a profile
 */
ProfileFactory.fromExportJson = (json:any) : Profile|null => {
    try {
        /* 
        Ensure username, bio, picPath, and inssajeom are present.
        */
        return {
            username: json.username, 
            bio: json.bio,
            picPath: json.picPath,
            inssajeom: json.inssajeom,
        };
    }
    catch (e) {
        /* 
        If conversion fails, then type error!
        */
        console.log(TypeError(PROFILE_TYPE_ERROR));
        console.log(e.stack);
    }        
    return null;
};
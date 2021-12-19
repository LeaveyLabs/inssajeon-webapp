import { ACCOUNT_TYPE_ERROR } from "../../strings/apiStringLibrary";
import { EntityFactory } from "../jsonFormat";

/* Holds all of one user's profile settings for 인싸전 */
export interface Account {
    signInMethod: Number;
    emailFrequency: Number;
}

/* Converts between JSON strings and Account Objects */
export const AccountFactory:EntityFactory = function () {}

/**
 * @param  {Account} acc
 * @returns Object
 * @description converts an account into a database-exportable json object
 */
AccountFactory.toExportJson = (acc:Account) : Object => { return acc; };

/**
 * @param  {Object} json
 * @returns Account
 * @description converts a database-exportable object into an account
 */
AccountFactory.fromExportJson = (json:any) : Account|null=> {
    try {
        return {signInMethod: json.signInMethod,
            emailFrequency: json.emailFrequency};
    }
    catch (e) {
        /* 
        If failure, then type conversion error. 
        */
        console.log(TypeError(ACCOUNT_TYPE_ERROR));
        console.log(e.stack);
    }
    return null;
};
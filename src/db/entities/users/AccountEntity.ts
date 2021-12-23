import { ACCOUNT_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";

/* Holds all of one user's profile settings for 인싸전 */
export interface AccountEntity extends IDictionary<Object> {
    signInMethod: Number;
    emailFrequency: Number;
}

/* Converts between JSON strings and Account Objects */
export const AccountFactory:EntityFactory = function () {}

/**
 * @param  {AccountEntity} acc
 * @returns Object
 * @description converts an account into a database-exportable json object
 */
AccountFactory.toExportJson = (acc:AccountEntity) : Object => { 
    const json:AccountEntity = {signInMethod: acc.signInMethod,
        emailFrequency: acc.emailFrequency};
    return validatedObject(json, ACCOUNT_TYPE_ERROR)
};

/**
 * @param  {Object} json
 * @returns Account
 * @description converts a database-exportable object into an account
 */
AccountFactory.fromExportJson = (json:any) : AccountEntity => {
    const acc:AccountEntity = {signInMethod: json.signInMethod,
        emailFrequency: json.emailFrequency};
    return validatedObject(acc, ACCOUNT_TYPE_ERROR) as AccountEntity;
};
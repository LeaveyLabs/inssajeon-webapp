import {USER_TYPE_ERROR} from "../../strings/apiConstLibrary";

import {ProfileEntity, ProfileFactory} from './ProfileEntity';
import {ActivityEntity, ActivityFactory} from './ActivityEntity';
import {AccountEntity, AccountFactory} from './AccountEntity';
import {UserID} from "./UserID"
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";

/* Holds all data owned by an 인싸전 User */
export interface UserEntity extends IDictionary<Object> {
    readonly id: UserID;
    info: ProfileEntity;
    activity: ActivityEntity;
    account: AccountEntity;
};

/* Converts between JSON strings and User Objects */
export const UserFactory:EntityFactory = function () {};

/**
 * @param  {UserEntity} user
 * @returns Object
 * @description converts user into a database-exportable json object
 */
UserFactory.toExportJson = (user:UserEntity) : Object => {
    /*
    Parse the JSON string representation of these parameters
    to acquire the JSON representation of these parameters
    */
    const o:UserEntity = {
        id: user.id, 
        info: ProfileFactory.toExportJson(user.info),
        activity: ActivityFactory.toExportJson(user.activity), 
        account: AccountFactory.toExportJson(user.account),
    };
    return validatedObject(o, USER_TYPE_ERROR);
};

/**
 * @param  {any} json
 * @returns User
 * @description converts a json object into user
 */
UserFactory.fromExportJson = (json:any) : UserEntity => {
    /*
    Use the factories to produce the correct type 
    from the approrpriate json properies
    */
    const user:UserEntity = {
        id: json.id, 
        info: ProfileFactory.fromExportJson(json.info),
        activity: ActivityFactory.fromExportJson(json.activity),
        account: AccountFactory.fromExportJson(json.account),
    }
    return validatedObject(user, USER_TYPE_ERROR) as UserEntity;
};
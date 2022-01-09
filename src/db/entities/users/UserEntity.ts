import { USER_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { UserProfileEntity, UserProfileFactory } from './UserProfileEntity';
import { UserActivityEntity, UserActivityFactory } from './UserActivityEntity';
import { UserSettingsEntity, UserSettingsFactory } from './UserSettingsEntity';
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";
import { UserMetricsEntity, UserMetricsFactory } from "./UserMetricsEntity";

/* Holds all data owned by an 인싸전 User */
export interface UserEntity extends IDictionary<Object> {
    readonly id: string;
    profile: UserProfileEntity;
    activity: UserActivityEntity;
    settings: UserSettingsEntity;
    metrics: UserMetricsEntity;
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
        profile: UserProfileFactory.toExportJson(user.profile),
        activity: UserActivityFactory.toExportJson(user.activity), 
        settings: UserSettingsFactory.toExportJson(user.settings),
        metrics: UserMetricsFactory.toExportJson(user.metrics),
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
        profile: UserProfileFactory.fromExportJson(json.profile),
        activity: UserActivityFactory.fromExportJson(json.activity),
        settings: UserSettingsFactory.fromExportJson(json.settings),
        metrics: UserMetricsFactory.fromExportJson(json.metrics),
    };
    return validatedObject(user, USER_TYPE_ERROR) as UserEntity;
};
import { USER_METRICS_TYPE_ERROR, PROFILE_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";

/* Holds user's metrics */
export interface UserMetricsEntity extends IDictionary<Object> {
    readonly inssajeom: number;
}

/* Converts between JSON strings and UserMetrics Objects */
export const UserMetricsFactory:EntityFactory = function () {};

/**
 * @param  {UserMetricsEntity} metrics
 * @returns Object
 * @description converts user metrics into a database-exportable json object
 */
UserMetricsFactory.toExportJson = (metrics:UserMetricsEntity) : Object => { 
    const json:UserMetricsEntity =  {
        inssajeom: Number(metrics.inssajeom),
    };
    return validatedObject(json, USER_METRICS_TYPE_ERROR); 
};

/**
 * @param  {any} json
 * @returns UserMetricsEntity
 * @description converts a json string into a user metrics
 */
UserMetricsFactory.fromExportJson = (json:any) : UserMetricsEntity => {
    /* 
    Ensure inssajeom are present.
    */
    const metrics:UserMetricsEntity =  {
        inssajeom: Number(json.inssajeom),
    };
    return validatedObject(metrics, USER_METRICS_TYPE_ERROR) as UserMetricsEntity;
};
import { POST_METRICS_TYPE_ERROR } from "../../strings/apiConstLibrary";
import { EntityFactory, IDictionary, validatedObject } from "../jsonFormat";

/* Holds post's metrics */
export interface PostMetricsEntity extends IDictionary<Object> {
    readonly upvoteCount: number;
    readonly downvoteCount: number;
    readonly shareCount: number;
    readonly flagCount: number;
    readonly trendscore: number;
}

/* Converts between JSON strings and UserMetrics Objects */
export const PostMetricsFactory:EntityFactory = function () {};

/**
 * @param  {PostMetricsEntity} metrics
 * @returns Object
 * @description converts metrics into a database-exportable json object
 */
 PostMetricsFactory.toExportJson = (metrics:PostMetricsEntity) : Object => { 
    const json:PostMetricsEntity =  {
        upvoteCount: Number(metrics.upvoteCount),
        downvoteCount: Number(metrics.downvoteCount),
        shareCount: Number(metrics.shareCount),
        flagCount: Number(metrics.flagCount),
        trendscore: Number(metrics.trendscore),
    };
    return validatedObject(json, POST_METRICS_TYPE_ERROR); 
};

/**
 * @param  {any} json
 * @returns PostMetricsEntity
 * @description converts a json string into metrics
 */
 PostMetricsFactory.fromExportJson = (json:any) : PostMetricsEntity => {
    /* 
    Ensure upvoteCount, downvoteCount, 
    shareCount, and flagCount are present.
    */
    const metrics:PostMetricsEntity =  {
        upvoteCount: Number(json.upvoteCount),
        downvoteCount: Number(json.downvoteCount),
        shareCount: Number(json.shareCount),
        flagCount: Number(json.flagCount),
        trendscore: Number(json.trendscore),
    };
    return validatedObject(metrics, POST_METRICS_TYPE_ERROR) as PostMetricsEntity;
};
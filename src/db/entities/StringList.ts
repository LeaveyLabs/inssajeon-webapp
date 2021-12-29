import { USERIDSET_TYPE_ERROR } from "../strings/apiConstLibrary";
import { EntityFactory } from "./jsonFormat";

export type StringList = Array<string>;

export const StringListFactory:EntityFactory = function () {};

/**
 * @param  {UserIDSet} stringList
 * @returns Object
 */
 StringListFactory.toExportJson = (stringList:StringList) : Object => {
    if(Array.isArray(stringList)) return stringList as StringList;
    throw new TypeError(USERIDSET_TYPE_ERROR);
}

/**
 * @param  {any} json
 * @returns stringList
 */
 StringListFactory.fromExportJson = (json:any) : StringList => {
    if(Array.isArray(json)) return json as StringList;
    throw new TypeError(USERIDSET_TYPE_ERROR);
}
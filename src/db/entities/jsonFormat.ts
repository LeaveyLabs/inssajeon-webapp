import { PostEntity } from './posts/PostEntity';
import { WordEntity } from './words/WordEntity';
import { AccountEntity } from './users/AccountEntity';
import { ActivityEntity } from './users/ActivityEntity';
import { ProfileEntity } from './users/ProfileEntity';
import { UserEntity } from './users/UserEntity';

export type Entity = AccountEntity | ActivityEntity | UserEntity | PostEntity | ProfileEntity | WordEntity;

/* Represents a sorted set indexed by order */
export interface IndexedStringSet {
    [key:number]:string;
};

/* Permits indexing by keys */
export interface IDictionary<T> {
    [key:string]:T;
};

/**
 * @param  {Set<string>} set
 * @returns IndexedStringSet
 * @description Converts a Set<string> into a StringMap in the order they were presented
 * {o0, o1, o2} -> {0:o0, 1:o1, 2:o2}
 */
export const stringSetToJson = (set:Set<string>) : IndexedStringSet => {
    // let entries:Array<string> = []
    // set.forEach((value) => {entries.push(value)})
    // return entries;
    let json:IndexedStringSet = {};
    let i = 0;
    /*
    For each string element, store it in an object with an index. 
    */
    set.forEach((value) => { json[i++] = value} );
    return json;
};

/**
 * @param  {IndexedStringSet} json
 * @returns Set
 * @description Converts an indexed string set into a Set<string>
 * {0:o0, 1:o1, 2:o2} -> {o0, o1, o2}
 */
export const jsonToStringSet = (json:IndexedStringSet) : Set<string> => {    
    let stringSet = new Set<string>();
    let keySet = new Set(Object.keys(json));
    /*
    For each string in an indexed set, store it a set.
    */
    keySet.forEach((key) => { stringSet.add(json[Number(key)]); });
    return stringSet;
};

/* Represents a sorted set indexed by order */
export interface IndexedEntitySet {
    [key:number]:Entity;
};

/* Class to convert between entities and JSON objects*/
export interface EntityFactory {
    toExportJson: Function;
    fromExportJson: Function;
}

/**
 * @param  {Set<Entity>} entitySet - set of entities (i.e. Set<User>)
 * @param  {Factory} factory - entity creation factory (e.g. AccountFactory)
 * @returns Object - json object with indexed database-exportable entities (e.g. {0: UserJson, 1: UserJson})
 * @description converts an entity set into a json object with indexed json entities
 */
export const entitySetToJson = (entitySet:Set<Entity>, factory:EntityFactory) : Object => {
    let json:IndexedEntitySet = {}
    let i = 0; 
    /*
    For each entity in the entity set, have the factory create a database-compatible JSON.
    Convert this JSON string into a JSON object. Index this JSON object in json.
    */
    entitySet.forEach((entity) => { json[i++] = factory.toExportJson(entity); });
    return json;
};

/**
 * @param  {any} json - json object with indexed database-exportable entities (e.g. {0: UserJson, 1: UserJson})
 * @param  {Factory} factory - entity creation factory (e.g. AccountFactory)
 * @returns Set<Entity> - set of entities (i.e. Set<User>)
 * @description converts a json object with indexed json entities into an entity set
 */
 export const jsonToEntitySet = (json:any, factory:EntityFactory) : Set<Entity> => {    
    let entitySet = new Set<Entity>();
    let keySet = new Set(Object.keys(json));
    /*
    For each index in the indexed set, acquire the object at that index. 
    Have the factory manufacture an entity from this object. 
    Add this entity to the entitySet.
    */
    keySet.forEach((key) => { entitySet.add(factory.fromExportJson(json[Number(key)])); });
    return entitySet;
};
/**
 * @param  {any} o - any indexed json object
 * @returns boolean
 * @description will check if any propery of the object is null or undefined at runtime
 */
export const hasNullProperties = (o:any) : boolean => {
    let valueList = Object.values(o);
    return !valueList.every((value) => { return value !== null && value !== undefined });
}

/**
 * @param  {any} o - any indexed json object
 * @returns Object | null
 * @description will check if any property of the object is null or undefined at runtime
 */
 export const validatedObject = (o:Object, msg:string) : Object => {
    /*
    See if every parameter exists. If so, return the desired object.
    */
    if(hasNullProperties(o)) throw new TypeError(msg);
    else return o;
}
import { Post } from './posts/Post';
import { Word } from './words/Word';
import { Account } from './users/Account';
import { Activity } from './users/Activity';
import { Profile } from './users/Profile';
import { User } from './users/User';
import { PostIDSet } from './posts/PostID';
import { UserIDSet } from './users/UserID';

export type Entity = Account | Activity | User | Post | PostIDSet | Profile | UserIDSet | Word ;

/* Represents a sorted set indexed by order */
export interface IndexedStringSet {
    [key:number]:string;
};

/**
 * @param  {Set<string>} set
 * @returns IndexedStringSet
 * @description Converts a Set<string> into a StringMap in the order they were presented
 * {o0, o1, o2} -> {0:o0, 1:o1, 2:o2}
 */
export const stringSetToJson = (set:Set<string>) : IndexedStringSet => {
    let json:IndexedStringSet = {};
    let i = 0;
    /*
    For each string element, store it in an object with an index. 
    */
    set.forEach((value) => {json[i++] = value;});
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
 * @returns IndexedEntitySet - json object with indexed entities (e.g. {0: User, 1: User})
 * @description converts an entity set into a json object with indexed entities
 */
export const entitySetToJson = (entitySet:Set<Entity>, factory:EntityFactory) : IndexedEntitySet => {
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
 * @param  {IndexedEntitySet} json - json object with indexed entities (e.g. {0: User, 1: User})
 * @param  {Factory} factory - entity creation factory (e.g. AccountFactory)
 * @returns Set<Entity> - set of entities (i.e. Set<User>)
 * @description converts a JSON object with indexed entities into an entity set
 */
 export const jsonToEntitySet = (json:IndexedEntitySet, factory:EntityFactory) : Set<Entity> => {
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
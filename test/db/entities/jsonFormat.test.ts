import {Entity, stringSetToJson,
jsonToStringSet, entitySetToJson, jsonToEntitySet, 
hasNullProperties, validatedObject, EntityFactory} from "../../../src/db/entities/jsonFormat";
import { PostFactory } from "../../../src/db/entities/posts/PostEntity";
import { TagFactory } from "../../../src/db/entities/tags/TagEntity";
import { AccountFactory } from "../../../src/db/entities/users/AccountEntity";
import { UserActivityFactory } from "../../../src/db/entities/users/UserActivityEntity";
import { UserFactory } from "../../../src/db/entities/users/UserEntity";
import { UserInfoFactory } from "../../../src/db/entities/users/UserInfoEntity";
import { WordFactory } from "../../../src/db/entities/words/WordEntity";
import { USER_TYPE_ERROR } from "../../../src/db/strings/apiConstLibrary";
import { createRandomAccount, createRandomActivity, createRandomPost, createRandomTag, createRandomUser, createRandomUserInfo, createRandomWord } from "./entityCreation";

/* stringSetToJson */
describe("testing stringSetToJson", () => {
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<string>();
        expect(stringSetToJson(b)).toStrictEqual(a);
    });

    it("numbers: {'1', '2', '3'} -> {'0':'1', '1':'2', '2':'3'}", () => {
        let a = { '0':'1', '1':'2', '2':'3' };
        let b = new Set(['1', '2', '3']);
        expect(stringSetToJson(b)).toStrictEqual(a);
    });

    it("names: {'John', 'Adam', 'Brah'} -> {'0':'John', '1':'Adam', '2':'Brah'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(stringSetToJson(b)).toStrictEqual(a);
    });

    it("special characters: {'#1', '@', '^'} -> {'0':'#1', '1':'@', '2':'^'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(stringSetToJson(b)).toStrictEqual(a);
    });
});

/* jsonToStringSet */
describe("testing jsonToStringSet", () => {
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<string>();
        expect(b).toStrictEqual(jsonToStringSet(a));
    });

    it("numbers: {'1', '2', '3'} -> {'0':'1', '1':'2', '2':'3'}", () => {
        let a = { '0':'1', '1':'2', '2':'3' };
        let b = new Set(['1', '2', '3']);
        expect(b).toStrictEqual(jsonToStringSet(a));
    });

    it("names: {'John', 'Adam', 'Brah'} -> {'0':'John', '1':'Adam', '2':'Brah'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(b).toStrictEqual(jsonToStringSet(a));
    });

    it("special characters: {'#1', '@', '^'} -> {'0':'#1', '1':'@', '2':'^'}", () => {
        let a = {'0':'John', '1':'Adam', '2':'Brah'};
        let b = new Set(['John', 'Adam', 'Brah']);
        expect(b).toStrictEqual(jsonToStringSet(a));
    });
});

/* entitySetToJson */
describe("testing entitySetToJson and jsonToEntitySet", () => {
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<Entity>();
        expect(entitySetToJson(b, UserFactory)).toStrictEqual(a);
        expect(jsonToEntitySet(a, UserFactory)).toStrictEqual(b);
    });
    it("entity: {entity1, entity2} <-> {0:entity1, 1:entity2}", () => {
        interface TestTuple {
            entity: Function, 
            factory: EntityFactory
        };

        let args:Array<TestTuple> = [
            {entity: createRandomUser, factory: UserFactory},
            {entity: createRandomPost, factory: PostFactory},
            {entity: createRandomTag, factory: TagFactory},
            {entity: createRandomActivity, factory: UserActivityFactory},
            {entity: createRandomUserInfo, factory: UserInfoFactory},
            {entity: createRandomAccount, factory: AccountFactory},
            {entity: createRandomWord, factory: WordFactory}
        ];

        for(const arg of args) {
            const entity1 = arg.entity();
            const entity2 = arg.entity();
            const entitySet = new Set<Entity>([entity1, entity2]);
            const json = {
                0: entity1, 
                1: entity2,
            }
            expect(entitySetToJson(entitySet, arg.factory)).toStrictEqual(json);
            expect(jsonToEntitySet(json, arg.factory)).toStrictEqual(entitySet);
        }
    });
});

/* hasNullProperties */
describe("testing hasNullProperties", () => {
    it("this empty object should return false", () => {
        expect(hasNullProperties({})).toStrictEqual(false);
    });
    it("this partially empty object should return true", () => {
        expect(hasNullProperties({"a":null, "b":5})).toStrictEqual(true);
    });
    it("this full object should return false", () => {
        expect(hasNullProperties({"a":"4", "b":5})).toStrictEqual(false);
    });
    it("this full object with empty sets should return false", () => {
        expect(hasNullProperties({"a":{}, "b":5})).toStrictEqual(false);
    });
});

/* validatedObject */
describe("testing validatedObject", () => {
    it("this empty object should return {}", () => {
        expect(validatedObject({}, USER_TYPE_ERROR)).toStrictEqual({});
    });
    it("this partially empty object should throw a type error", () => {
        const functionToThrow = () => validatedObject({"a":null, "b":5}, USER_TYPE_ERROR);
        expect(functionToThrow).toThrow(new TypeError(USER_TYPE_ERROR));
    });
    it("this full object should return the same object", () => {
        expect(validatedObject({"a":"4", "b":5}, USER_TYPE_ERROR)).toStrictEqual({"a":"4", "b":5});
    });
    it("this full object with empty sets should return the same object", () => {
        expect(validatedObject({"a":{}, "b":5}, USER_TYPE_ERROR)).toStrictEqual({"a":{}, "b":5});
    });
});
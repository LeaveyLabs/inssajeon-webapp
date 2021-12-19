import {Entity, IndexedStringSet, stringSetToJson,
jsonToStringSet, IndexedEntitySet, EntityFactory,
entitySetToJson, jsonToEntitySet} from "../../../src/db/entities/jsonFormat";

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
describe("testing entitySetToJson", () => {
    // Empty
    it("empty: {} -> {}", () => {
        let a = { };
        let b = new Set<Entity>();
        expect(b).toStrictEqual(jsonToStringSet(a));
    });
    // Account 
    // Activity 
    // User 
    // Post
    // PostIDSet
    // Profile
    // UserIDSet
    // Word
});

/* jsonToEntitySet */
describe("testing jsonToEntitySet", () => {
    // Empty
    // Account 
    // Activity 
    // User 
    // Post
    // PostIDSet
    // Profile
    // UserIDSet
    // Word
});
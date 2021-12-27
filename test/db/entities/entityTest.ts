import { Entity, EntityFactory } from "../../../src/db/entities/jsonFormat";

/* fromExportJson */
export function generateFromExportJsonTest(factory:EntityFactory, standard:any, json:any, modified:Entity) {
    return () => {
        it("empty set: {} -> {}", () => {
            const a = {};
            const functionToThrow = () => factory.fromExportJson(a);
            expect(functionToThrow).toThrowError(TypeError);
        });
    
        it("valid entity: entity -> entity", () => {
            let a = standard;
            let b = json;
            expect(factory.fromExportJson(json)).toEqual(standard);
        });
    
        it("two different objects should not export the same result", () => {
            expect(factory.fromExportJson(json)).toEqual(standard);
            expect(factory.fromExportJson(modified)).not.toEqual(standard);
        });
    
        it("export inverts import", () => {
            expect(factory.fromExportJson(
                factory.toExportJson(standard)))
                .toStrictEqual(standard);
        });
    };
}

/* toExportJson */
export function generateToExportJsonTest(factory:EntityFactory, standard:Entity, json:any, modified:Entity) {
    return () => {
        it("empty set: {} -> {}", () => {
            const a = {};
            const functionToThrow = () => factory.toExportJson(a);
            expect(functionToThrow).toThrowError(TypeError);
        });
    
        it("valid entity: entity -> entity", () => {
            let a = standard;
            let b = json;
            expect(factory.toExportJson(json)).toEqual(standard);
        });
    
        it("two different objects should not export the same result", () => {
            expect(factory.toExportJson(json)).toEqual(standard);
            expect(factory.toExportJson(modified)).not.toEqual(standard);
        });
    
        it("import inverts export", () => {
            expect(factory.toExportJson(
                factory.fromExportJson(standard)))
                .toStrictEqual(standard);
        });
    };
}
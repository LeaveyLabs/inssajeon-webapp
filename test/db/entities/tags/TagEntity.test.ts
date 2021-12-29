import { TagEntity, TagFactory } from "../../../../src/db/entities/tags/TagEntity";
import { createRandomTag } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardTag:TagEntity = createRandomTag();
let modifiedTag:TagEntity = createRandomTag();
while(standardTag == modifiedTag) { modifiedTag = createRandomTag(); }
let jsonTag = JSON.parse(JSON.stringify(standardTag));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(TagFactory, standardTag, jsonTag, modifiedTag));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(TagFactory, standardTag, jsonTag, modifiedTag));
import { TagSetFactory } from "../../../../src/db/entities/posts/Tag";
import { jsonTagSet, standardTagSet } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

const modifiedTagSet = ["5"];

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(TagSetFactory, standardTagSet, jsonTagSet, modifiedTagSet));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(TagSetFactory, standardTagSet, jsonTagSet, modifiedTagSet));
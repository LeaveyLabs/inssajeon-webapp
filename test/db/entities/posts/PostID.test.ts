import { PostIDSetFactory } from "../../../../src/db/entities/posts/PostID";
import { jsonPostIDSet, standardPostIDSet } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

const modifiedPostIDSet = ["5"];

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(PostIDSetFactory, standardPostIDSet, jsonPostIDSet, modifiedPostIDSet));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(PostIDSetFactory, standardPostIDSet, jsonPostIDSet, modifiedPostIDSet));
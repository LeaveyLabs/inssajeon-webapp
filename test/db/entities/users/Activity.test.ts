import { ActivityFactory } from "../../../../src/db/entities/users/ActivityEntity";
import { jsonActivity, standardActivity } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let modifiedActivity = JSON.parse(JSON.stringify(jsonActivity));
modifiedActivity.upvotes = ["5"];

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(ActivityFactory, standardActivity, jsonActivity, modifiedActivity));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(ActivityFactory, standardActivity, jsonActivity, modifiedActivity));
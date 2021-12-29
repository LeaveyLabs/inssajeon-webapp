import { UserActivityEntity, UserActivityFactory } from "../../../../src/db/entities/users/UserActivityEntity";
import { createRandomUserActivity } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardActivity:UserActivityEntity = createRandomUserActivity();
let modifiedActivity:UserActivityEntity = createRandomUserActivity();
while(standardActivity == modifiedActivity) { modifiedActivity = createRandomUserActivity(); }
let jsonActivity = JSON.parse(JSON.stringify(standardActivity));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserActivityFactory, standardActivity, jsonActivity, modifiedActivity));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserActivityFactory, standardActivity, jsonActivity, modifiedActivity));
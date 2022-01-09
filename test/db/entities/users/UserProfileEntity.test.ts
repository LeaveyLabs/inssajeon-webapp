import { UserProfileEntity, UserProfileFactory } from "../../../../src/db/entities/users/UserProfileEntity";
import { createRandomUserInfo } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardUserInfo:UserProfileEntity = createRandomUserInfo();
let modifiedUserInfo:UserProfileEntity = createRandomUserInfo();
while(standardUserInfo == modifiedUserInfo) { modifiedUserInfo = createRandomUserInfo(); }
let jsonActivity = JSON.parse(JSON.stringify(standardUserInfo));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserProfileFactory, standardUserInfo, jsonActivity, modifiedUserInfo));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserProfileFactory, standardUserInfo, jsonActivity, modifiedUserInfo));
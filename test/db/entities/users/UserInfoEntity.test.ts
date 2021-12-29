import { UserInfoEntity, UserInfoFactory } from "../../../../src/db/entities/users/UserInfoEntity";
import { createRandomUserInfo } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardUserInfo:UserInfoEntity = createRandomUserInfo();
let modifiedUserInfo:UserInfoEntity = createRandomUserInfo();
while(standardUserInfo == modifiedUserInfo) { modifiedUserInfo = createRandomUserInfo(); }
let jsonActivity = JSON.parse(JSON.stringify(standardUserInfo));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserInfoFactory, standardUserInfo, jsonActivity, modifiedUserInfo));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserInfoFactory, standardUserInfo, jsonActivity, modifiedUserInfo));
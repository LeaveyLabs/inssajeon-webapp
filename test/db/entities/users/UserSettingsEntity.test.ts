import { UserSettingsEntity, UserSettingsFactory } from "../../../../src/db/entities/users/UserSettingsEntity";
import { createRandomAccount } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardAccount:UserSettingsEntity = createRandomAccount();
let modifiedAccount:UserSettingsEntity = createRandomAccount();
while(standardAccount == modifiedAccount) { modifiedAccount = createRandomAccount(); }
let jsonAccount = JSON.parse(JSON.stringify(standardAccount));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserSettingsFactory, standardAccount, jsonAccount, modifiedAccount));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserSettingsFactory, standardAccount, jsonAccount, modifiedAccount));
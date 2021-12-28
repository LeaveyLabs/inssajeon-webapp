import { UserAccountEntity, UserAccountFactory } from "../../../../src/db/entities/users/UserAccountEntity";
import { createRandomAccount } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardAccount:UserAccountEntity = createRandomAccount();
let modifiedAccount:UserAccountEntity = createRandomAccount();
while(standardAccount == modifiedAccount) { modifiedAccount = createRandomAccount(); }
let jsonAccount = JSON.parse(JSON.stringify(standardAccount));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserAccountFactory, standardAccount, jsonAccount, modifiedAccount));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserAccountFactory, standardAccount, jsonAccount, modifiedAccount));
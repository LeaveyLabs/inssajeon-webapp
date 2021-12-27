import { AccountEntity, AccountFactory } from "../../../../src/db/entities/users/AccountEntity";
import { createRandomAccount } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardAccount:AccountEntity = createRandomAccount();
let modifiedAccount:AccountEntity = createRandomAccount();
while(standardAccount == modifiedAccount) { modifiedAccount = createRandomAccount(); }
let jsonAccount = JSON.parse(JSON.stringify(standardAccount));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(AccountFactory, standardAccount, jsonAccount, modifiedAccount));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(AccountFactory, standardAccount, jsonAccount, modifiedAccount));
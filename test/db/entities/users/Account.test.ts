import { AccountFactory } from "../../../../src/db/entities/users/AccountEntity";
import { jsonAccount, standardAccount } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let modifiedAccount = JSON.parse(JSON.stringify(standardAccount));
modifiedAccount.emailFrequency += 1; 

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(AccountFactory, standardAccount, jsonAccount, modifiedAccount));

/* fromExportJson */
describe("testing toExportJson", generateToExportJsonTest(AccountFactory, standardAccount, jsonAccount, modifiedAccount));
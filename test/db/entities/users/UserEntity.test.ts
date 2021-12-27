import { UserEntity, UserFactory } from "../../../../src/db/entities/users/UserEntity";
import { createRandomUser } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardUser:UserEntity = createRandomUser();
let modifiedUser:UserEntity = createRandomUser();
while(standardUser == modifiedUser) { modifiedUser = createRandomUser(); }
let jsonUser = JSON.parse(JSON.stringify(standardUser));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserFactory, standardUser, jsonUser, modifiedUser));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserFactory, standardUser, jsonUser, modifiedUser));
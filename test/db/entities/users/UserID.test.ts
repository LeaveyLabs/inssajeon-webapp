import { UserIDSetFactory } from "../../../../src/db/entities/users/UserID";
import { jsonUserIDSet, standardUserIDSet } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

const modifiedUserIDSet = ["5"];

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserIDSetFactory, standardUserIDSet, jsonUserIDSet, modifiedUserIDSet));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserIDSetFactory, standardUserIDSet, jsonUserIDSet, modifiedUserIDSet));
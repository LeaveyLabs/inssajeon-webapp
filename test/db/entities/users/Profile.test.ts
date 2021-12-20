import { ProfileFactory } from "../../../../src/db/entities/users/Profile";
import { jsonProfile, standardProfile } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let modifiedProfile = JSON.parse(JSON.stringify(standardProfile));
modifiedProfile.inssajeom += 1;

/* fromExportJson */
describe("testing jsonExportJson", generateFromExportJsonTest(ProfileFactory, standardProfile, jsonProfile, modifiedProfile));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(ProfileFactory, standardProfile, jsonProfile, modifiedProfile));
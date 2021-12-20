import { UserFactory } from "../../../../src/db/entities/users/User";
import { jsonUser, standardPostID, standardPostIDSet, standardUser } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let modifiedUser = JSON.parse(JSON.stringify(standardUser));
modifiedUser.activity = {
    upvotes: standardPostIDSet,
    downvotes: standardPostIDSet,
    favorites: [standardPostID],
    submissions: standardPostIDSet,
    lastLogin: modifiedUser.activity.lastLogin,
};

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(UserFactory, standardUser, jsonUser, modifiedUser));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(UserFactory, standardUser, jsonUser, modifiedUser));
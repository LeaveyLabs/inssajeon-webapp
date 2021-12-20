import { PostFactory } from "../../../../src/db/entities/posts/Post";
import { jsonPost, standardPost } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let modifiedPost = JSON.parse(JSON.stringify(standardPost));
modifiedPost.trendscore++;

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(PostFactory, standardPost, jsonPost, modifiedPost));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(PostFactory, standardPost, jsonPost, modifiedPost));
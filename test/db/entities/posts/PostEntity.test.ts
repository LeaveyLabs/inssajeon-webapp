import { PostEntity, PostFactory } from "../../../../src/db/entities/posts/PostEntity";
import { createRandomPost } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardPost:PostEntity = createRandomPost();
let modifiedPost:PostEntity = createRandomPost();
while(standardPost == modifiedPost) { modifiedPost = createRandomPost(); }
let jsonPost = JSON.parse(JSON.stringify(standardPost));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(PostFactory, standardPost, jsonPost, modifiedPost));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(PostFactory, standardPost, jsonPost, modifiedPost));
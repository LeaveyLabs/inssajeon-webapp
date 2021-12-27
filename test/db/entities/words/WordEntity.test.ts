import { WordEntity, WordFactory } from "../../../../src/db/entities/words/WordEntity";
import { createRandomWord } from "../entityCreation";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

let standardWord:WordEntity = createRandomWord();
let modifiedWord:WordEntity = createRandomWord();
while(standardWord == modifiedWord) { modifiedWord = createRandomWord(); }
let jsonWord = JSON.parse(JSON.stringify(standardWord));

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(WordFactory, standardWord, jsonWord, modifiedWord));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(WordFactory, standardWord, jsonWord, modifiedWord));
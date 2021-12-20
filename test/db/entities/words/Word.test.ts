import { WordFactory } from "../../../../src/db/entities/words/Word";
import { jsonWord, standardWord } from "../basicTestEntities";
import { generateFromExportJsonTest, generateToExportJsonTest } from "../entityTest";

const modifiedWord = JSON.parse(JSON.stringify(standardWord));
modifiedWord.trendscore += 1;

/* fromExportJson */
describe("testing fromExportJson", generateFromExportJsonTest(WordFactory, standardWord, jsonWord, modifiedWord));

/* toExportJson */
describe("testing toExportJson", generateToExportJsonTest(WordFactory, standardWord, jsonWord, modifiedWord));
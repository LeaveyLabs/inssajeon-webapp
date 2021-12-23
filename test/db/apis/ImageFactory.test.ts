import axios from "axios";
import { ImageFactory } from "../../../src/db/apis/ImageFactory"
import { readFile, readFileSync } from 'fs';
import path from "path";

describe("testing ImageFactory", () => {
    it("upload basic file", async () => {
        const imgArr = readFileSync(path.resolve(__dirname, "../test.png"))
        await ImageFactory.saveToFirebaseStorage(new Uint8Array(imgArr), "logo.png");
    });
    it("upload and then delete basic file", async () => {
        const imgArr = readFileSync(path.resolve(__dirname, "../test.png"))
        const fbPath = await ImageFactory.saveToFirebaseStorage(new Uint8Array(imgArr), "logo.png");
        await ImageFactory.deleteFromFirebaseStorage(fbPath);
    });
});
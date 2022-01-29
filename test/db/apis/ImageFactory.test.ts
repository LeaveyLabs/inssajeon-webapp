import { ImageFactory } from "../../../src/db/apis/ImageFactory"
import { readFileSync } from 'fs';
import https from 'https';
import path from "path";

describe("testing ImageFactory", () => {
    /* Temporarily removing tests until we find a lightweight way to test uploading images. */
    /*  
    it("upload basic file", async () => {
        https.get("https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",  async(res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', async (d) => {
                await ImageFactory.saveToFirebaseStorage(new Uint8Array(d), "logo.png");
            });
            }).on('error', (e) => {
            console.error(e);
        });
    });
    it("upload and then delete basic file", async () => {
        https.get("https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",  async(res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', async (d) => {
                const fbPath = await ImageFactory.saveToFirebaseStorage(new Uint8Array(d), "logo.png");
                await ImageFactory.deleteFromFirebaseStorage(fbPath);
            });
            }).on('error', (e) => {
            console.error(e);
        });
    });
    */
});
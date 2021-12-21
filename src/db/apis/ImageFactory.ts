import { IMG_DIR, MAX_IMG_BYTES } from "../strings/apiConstLibrary";
import { randomUUID } from "crypto";
import { imgDatabase } from "./dbRefs";
import { ref, uploadBytes } from "@firebase/storage";

type Path = string;

function isImageFile(file:File): boolean {
    return file && file.type.split('/')[0] === 'image';
}
/**
 * @param  {File} image - image file to download
 * @returns Path - location of the image in Firebase Storage
 * @description will upload an image file to Firebase Storage database
 */
export const saveToFirestore = (image:File) : Path => {
    /*
    Ensure that the image file is a valid image below the
    size limit. 
    */
    if(image.size > MAX_IMG_BYTES || !isImageFile(image)) {
        throw new Error("Image size is too large!");
    }
    const fbPath:Path = [IMG_DIR, randomUUID(), image.name].join("/");
    const newImgRef = ref(imgDatabase, fbPath);
    uploadBytes(newImgRef, image);
    return fbPath;
}

export const deleteFromFirestore = (path:Path) : boolean => {
    return false;
}
import { IMG_DIR, IMG_ERROR_SIZE, IMG_ERROR_UNSUPPORTED_EXT, IMG_ERROR_URL, MAX_IMG_BYTES, SUPPORTED_EXT } from "../strings/apiConstLibrary";
import { imgDatabase } from "./dbRefs";
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, ref, uploadBytes } from "@firebase/storage";
import { readFile, readFileSync } from "fs";
import { getDownloadURL } from "firebase/storage";

type Path = string;
type ImageData = Uint8Array;

function isImageFile(filePath:Path): boolean {
    return filePath !== null && SUPPORTED_EXT.includes(getExt(filePath));
}

function getExt(filePath:Path): string {
    const exts = filePath.split(".");
    return exts[exts.length-1];
}

export const ImageFactory = function () {};

/**
 * @param {ImageData} imageData - byte array of image data (Uint8Array)
 * @param  {Path} localPath - local path to the image file to download
 * @returns Path - location of the image in Firebase Storage
 * @description will upload an image file to Firebase Storage database
 */
ImageFactory.saveToFirebaseStorage = async (imageData:ImageData, imageName:Path) : Promise<Path> => {
    /*
    Ensure that the image file is a valid image 
    below the size limit. 
    */
    if(!isImageFile(imageName)) throw new TypeError(IMG_ERROR_UNSUPPORTED_EXT);
    if(imageData.length > MAX_IMG_BYTES) throw new Error(IMG_ERROR_SIZE);

    /*
    Create a new image in the "image directory" with the same extention.
    Upload the bytes to this directory. 
    */
    const fbPath:Path = [IMG_DIR, `${uuidv4()}.${getExt(imageName)}`].join("/"); 
    const newImgRef = ref(imgDatabase, fbPath);
    await uploadBytes(newImgRef, imageData, 
        {contentType: `image/${getExt(imageName)}`});

    return fbPath;
}

/**
 * @param  {Path} path - path to an image in firebase storage
 * @returns boolean - success
 * @description will delete an image path from firebase storage
 */
ImageFactory.deleteFromFirebaseStorage = async (imagePath:Path) : Promise<void> => {
    /* Ensure that the image file is a valid image. */
    if(!isImageFile(imagePath)) throw new TypeError(IMG_ERROR_UNSUPPORTED_EXT);

    /* Delete the reference at the path. */
    const deleteRef = ref(imgDatabase, imagePath);
    try { await deleteObject(deleteRef); }
    catch (e) { throw e; /* If there's an error, propogate error up the stack. */ }
}
/**
 * @param  {Path} imagePath - path to an image in firebase storage
 * @returns Promise<string> - download URL to the image
 * @description produces an image URL to host on a website from a firebase storage path
 */
ImageFactory.pathToImageURL = async (imagePath:Path) : Promise<string> => {
    /* Ensure that the image file is a valid image. */
    if(!isImageFile(imagePath)) throw new TypeError(IMG_ERROR_UNSUPPORTED_EXT);

    /* Host the reference at the path. */
    const imageRef = ref(imgDatabase, imagePath);
    try { return await getDownloadURL(imageRef); }
    catch { throw Error(IMG_ERROR_URL); }
}
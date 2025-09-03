import imagekit from "../config/imagekit.js";
import fs from "fs";
import {v4 as uuid} from "uuid";

export const uploadToImageKit = async (fileBuffer, fileName) => {
  try {
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteFromImageKit = async (fileId) => {
  try {
    return await imagekit.deleteFile(fileId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadImageToImageKit = async (file, fileName) => {
  try {
    const fileBuffer = fs.readFileSync(file.path);
    if(!fileName) fileName = uuid();

    const imageKitResponse = await uploadToImageKit(fileBuffer, fileName);
    if (!imageKitResponse) {
      throw new Error("Failed to upload image to ImageKit");
    }

    fs.unlinkSync(file.path);

    return imageKitResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteImageFromImageKit = async (fileId) => {
  try {
    return await deleteFromImageKit(fileId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

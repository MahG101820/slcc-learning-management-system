import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "@/firebase/configuration";

const storage = getStorage(app);

const createStorageRef = (pointer) => ref(storage, pointer);

const uploadImage = async (image, pointer) => {
  try {
    const imageRef = createStorageRef(pointer);
    const response = await uploadBytesResumable(imageRef, image);
    return response.state;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const downloadImage = async (pointer) => {
  try {
    const imageRef = createStorageRef(pointer);
    const response = await getDownloadURL(imageRef);
    return response;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const deleteImage = async (pointer) => {
  try {
    const imageRef = createStorageRef(pointer);
    await deleteObject(imageRef);
    return "success";
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return "success";
    }
  }
};

export { uploadImage, downloadImage, deleteImage };

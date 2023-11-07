import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { main, backup } from "@/firebase/configuration";

const mainStorage = getStorage(main);
const backupStorage = getStorage(backup);

const createMainStorageRef = (pointer) => ref(mainStorage, pointer);
const createBackupStorageRef = (pointer) => ref(backupStorage, pointer);

const uploadImage = async (image, pointer) => {
  try {
    const mainImageRef = createMainStorageRef(pointer);
    const backupImageRef = createBackupStorageRef(pointer);

    const mainUploadPromise = uploadBytesResumable(mainImageRef, image);
    const backupUploadPromise = uploadBytesResumable(backupImageRef, image);

    const [mainUploadResponse, backupUploadResponse] = await Promise.all([
      mainUploadPromise,
      backupUploadPromise
    ]);

    if (mainUploadResponse.state === "success" && backupUploadResponse.state === "success") {
      return "success";
    }
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const downloadImage = async (pointer) => {
  try {
    const mainImageRef = createMainStorageRef(pointer);
    const response = await getDownloadURL(mainImageRef);
    return response;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const deleteImage = async (pointer) => {
  try {
    const mainImageRef = createMainStorageRef(pointer);
    const backupImageRef = createBackupStorageRef(pointer);

    await Promise.all([deleteObject(mainImageRef), deleteObject(backupImageRef)]);

    return "success";
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return "success";
    }
  }
};

export { uploadImage, downloadImage, deleteImage };

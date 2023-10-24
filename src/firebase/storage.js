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
  const imageRef = createStorageRef(pointer);
  const response = await uploadBytesResumable(imageRef, image);
  return response.state;
};

const downloadImage = async (pointer) => {
  const imageRef = createStorageRef(pointer);
  const response = await getDownloadURL(imageRef);
  return response;
};

const deleteImage = async (pointer) => {
  const imageRef = createStorageRef(pointer);
  const response = await deleteObject(imageRef);
  return response;
};

export { uploadImage, downloadImage, deleteImage };

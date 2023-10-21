import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "@/firebase/configuration";

const storage = getStorage(app);

const createStorageRef = (pointer) => ref(storage, pointer);

const uploadImage = async (image, pointer) => {
  const imageRef = createStorageRef(pointer);
  const response = await uploadBytesResumable(imageRef, image);
  return response.state;
};

export { uploadImage };

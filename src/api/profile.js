import { useProfileStore } from "@/stores/profile";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = new Headers();
const formData = new FormData();

headers.append("Accept", "application/json");
headers.append("Authorization", "Bearer 387|6q5RGtSmpPXZbjBjjtVeJyGND3soWHGWs8xFEBGD");

const store = useProfileStore();
const profile = store.profile;

const updateProfile = async (key, value) => {
  formData.append("id", profile.id);

  if (key === "name") {
    console.log(value);

    formData.append("fname", value[0]);
    formData.append("mname", value[1]);
    formData.append("lname", value[2]);
    formData.append("image", profile.image);
    formData.append("password", null);
  } else if (key === "image") {
    formData.append("fname", profile.fname);
    formData.append("mname", profile.mname);
    formData.append("lname", profile.lname);
    formData.append("image", value);
    formData.append("password", null);
  } else {
    formData.append("fname", profile.fname);
    formData.append("mname", profile.mname);
    formData.append("lname", profile.lname);
    formData.append("image", profile.image);
    formData.append("password", value);
  }

  try {
    const url = new URL(`${baseUrl}/update-profile`);
    const response = await fetch(url, { method: "POST", headers, body: formData });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { updateProfile };

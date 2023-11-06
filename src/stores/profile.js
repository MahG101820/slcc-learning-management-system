import { reactive } from "vue";
import { defineStore } from "pinia";

const defaultProfile = {
  id: 0,
  fname: "",
  mname: "",
  lname: "",
  email: "",
  image: "",
  type: "",
  token: ""
};

export const useProfileStore = defineStore(
  "profile",

  () => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const profile = reactive({ ...defaultProfile, ...storedProfile });

    const reset = () => {
      Object.assign(profile, defaultProfile);
      localStorage.removeItem("profile");
    };

    return {
      profile,
      reset
    };
  },

  {
    persist: {
      storage: window.localStorage,
      properties: ["id", "fname", "mname", "lname", "email", "image", "type", "token"]
    }
  }
);

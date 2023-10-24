import { reactive } from "vue";
import { defineStore } from "pinia";

export const useProfileStore = defineStore(
  "profile",

  () => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));

    const profile = reactive({
      id: storedProfile ? storedProfile.id : 0,
      fname: storedProfile ? storedProfile.fname : "",
      mname: storedProfile ? storedProfile.mname : "",
      lname: storedProfile ? storedProfile.lname : "",
      email: storedProfile ? storedProfile.email : "",
      type: storedProfile ? storedProfile.type : "",
      token: storedProfile ? storedProfile.token : ""
    });

    const reset = () => {};

    return {
      profile,
      reset
    };
  },

  {
    persist: {
      storage: window.localStorage,
      properties: ["id", "fname", "mname", "lname", "email", "type", "token"]
    }
  }
);

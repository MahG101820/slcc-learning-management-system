import { reactive } from "vue";
import { defineStore } from "pinia";

export const useProfileStore = defineStore(
  "profile",
  () => {
    const profile = reactive({
      id: "",
      fname: "",
      mname: "",
      lname: "",
      email: "",
      type: "",
      token: ""
    });

    const reset = () => {};

    return {
      profile,
      reset
    };
  },

  {
    persist: true
  }
);

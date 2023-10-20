import { reactive } from "vue";
import { defineStore } from "pinia";

export const useReadingStore = defineStore(
  "reading",

  () => {
    const reading = reactive({
      chapter: {
        id: 0,
        number: 0,
        description: ""
      },

      lesson: {
        id: 0,
        number: 0,
        description: "",
        image: "",
        content: ""
      }
    });

    const reset = () => {
      reading.chapter = {
        id: 0,
        number: 0,
        description: ""
      };

      reading.lesson = {
        id: 0,
        number: 0,
        description: "",
        image: "",
        content: ""
      };
    };

    return { reading, reset };
  },

  {
    persist: true
  }
);

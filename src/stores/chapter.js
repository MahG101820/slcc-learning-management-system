import { reactive } from "vue";
import { defineStore } from "pinia";

export const useChapterStore = defineStore(
  "chapter",

  () => {
    const chapter = reactive({
      id: 0,
      number: 0,
      description: "",
      image: null
    });

    const reset = () => {
      chapter.id = 0;
      chapter.number = 0;
      chapter.description = "";
      chapter.image = "";
    };

    return { chapter, reset };
  }
);

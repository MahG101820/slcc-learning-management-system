import { ref } from "vue";
import { defineStore } from "pinia";

export const useLessonStore = defineStore(
  "lesson",
  () => {
    const chapterId = ref(0);
    const chapterNumber = ref(0);
    const chapterDescription = ref("");

    const id = ref(0);
    const number = ref(0);
    const description = ref("");
    const image = ref("");
    const content = ref("");

    const reset = () => {
      chapterId.value = 0;
      chapterNumber.value = 0;
      chapterDescription.value = "";

      id.value = 0;
      number.value = 0;
      description.value = "";
      image.value = "";
      content.value = "";
    };

    return {
      chapterId,
      chapterNumber,
      chapterDescription,
      id,
      number,
      description,
      image,
      content,
      reset
    };
  },
  {
    persist: true
  }
);

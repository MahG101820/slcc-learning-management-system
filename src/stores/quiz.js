import { reactive } from "vue";
import { defineStore } from "pinia";

export const useQuizStore = defineStore(
  "quiz",

  () => {
    const quiz = reactive({
      status: {
        started: false,
        finished: false,
        active: 0,
        answers: []
      },

      details: {
        id: "",
        title: "",
        type: 0,
        questions: {
          texts: [],
          images: []
        },
        answers: [],
        options: {
          texts: [],
          images: []
        }
      }
    });

    const reset = () => {
      quiz.status = {
        started: false,
        finished: false,
        active: 0,
        answers: []
      };

      quiz.details = {
        id: "",
        title: "",
        questions: {
          texts: [],
          images: []
        },
        answers: [],
        options: {
          texts: [],
          images: []
        }
      };
    };

    return { quiz, reset };
  }
);

<template>
  <button
    v-for="(item, index) in quizzes"
    :key="index"
    @click="navigateToAnswerQuiz(item.id, index + 1, item.quiz_type)"
    type="button"
    class="border-stone-300 bg-stone-100 col-span-3 h-40 border rounded-lg transition-all hover:border-emerald-600 hover:scale-95 hover:shadow-lg"
  >
    <div class="bg-emerald-600 text-stone-100 h-12 rounded-t-lg grid place-items-center">
      <p class="text-xl font-bold uppercase">{{ `Quiz ${index + 1}` }}</p>
    </div>

    <div class="h-28 px-4 py-2 text-left rounded-b-lg flex flex-col">
      <p class="h-12 overflow-hidden">
        {{ item.description }}
      </p>

      <div class="flex-1 flex items-center gap-2">
        <p class="bg-stone-200 text-stone-500 px-2 py-1 text-[0.65rem] capitalize rounded-full">
          {{
            item.type === 0
              ? "Multiple Choice"
              : item.type === 1
              ? "Binary Choice"
              : "Fill in the blanks"
          }}
        </p>
      </div>
    </div>
  </button>

  <button
    type="button"
    class="border-stone-300 bg-stone-100 col-span-3 h-40 border rounded-lg transition-all hover:border-emerald-600 hover:scale-95 hover:shadow-lg"
  >
    <p class="text-xl font-medium">Add new quiz</p>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";
import { readQuizzes, readQuizItems } from "@/api/quizzes";
import { useProfileStore } from "@/stores/profile";
import { useQuizStore } from "@/stores/quiz";

const router = useRouter();
const storeProfile = useProfileStore();
const storeQuiz = useQuizStore();
const quizzesList = await readQuizzes(storeProfile.profile.id);
const quizzesFilteredList = quizzesList.filter((key) => key.user_id !== null);
const quizzesFilteredIdList = new Set(quizzesFilteredList.map((item) => item.id));
const quiz = storeQuiz.quiz;
const answeredQuizzes = JSON.parse(localStorage.getItem("answered-quizzes"));

const quizzes = Array.from(quizzesFilteredIdList)
  .filter((item) => !answeredQuizzes.includes(item))
  .concat(answeredQuizzes.filter((item) => !Array.from(quizzesFilteredIdList).includes(item)));

const navigateToAnswerQuiz = async (id, number, type) => {
  const response = await readQuizItems(id);
  const textsList = [];
  const imagesList = [];

  response.detail.forEach((item) => {
    textsList.push(
      item.options.filter((_, index) => index % 2 === 0).map((key) => key.split("text:")[1].trim())
    );
  });

  response.detail.forEach((item) => {
    imagesList.push(
      item.options.filter((_, index) => index % 2 !== 0).map((key) => key.split("image:")[1].trim())
    );
  });

  storeQuiz.reset();

  quiz.details = {
    id: response.title_id,
    title: response.title,
    type: type,
    questions: {
      texts: response.detail.map((key) => key.questions.split(",")[0].slice(5).trim()),
      images: response.detail.map((key) => key.questions.split(",")[1].slice(6).trim())
    },
    answers: response.detail.map((key) => key.answers),
    options: {
      texts: [...textsList],
      images: [...imagesList]
    }
  };

  localStorage.setItem(`quiz-${id}`, JSON.stringify(quiz));
  router.push({ name: "quizzes-answer", params: { id: number, number: id } });
};
</script>

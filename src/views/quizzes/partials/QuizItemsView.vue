<template>
  <main class="h-full grid place-items-center">
    <div
      v-if="!started && !finished"
      class="border-gray-300 bg-gray-100 w-8/12 h-4/6 border rounded-lg flex flex-col items-center justify-center"
    >
      <p class="text-3xl font-bold">{{ `Quiz ${route.params.id}` }}</p>
      <p class="mb-8 font-medium">{{ details.title }}</p>

      <PrimaryButton @click="startQuiz">Start Quiz</PrimaryButton>
    </div>

    <div
      v-if="started && !finished"
      class="border-gray-300 bg-gray-100 w-3/4 h-full p-4 border rounded-lg flex flex-col gap-2"
    >
      <div class="flex flex-col">
        <p>{{ `Question ${active} of ${details.questions.texts.length}` }}</p>

        <div class="flex-1 grid gap-2">
          <img
            :src="details.questions.images[status.active - 1]"
            alt=""
            class="bg-gray-300 h-52 mx-auto aspect-video object-cover object-center rounded-lg"
          />

          <p class="truncate text-center">{{ details.questions.texts[status.active - 1] }}</p>
        </div>
      </div>

      <div class="flex-1 grid grid-flow-col grid-cols-12 gap-2">
        <button
          v-for="(_, index) in details.type === 0 ? 4 : details.type === 1 ? 2 : 0"
          :key="index"
          @click="selectAnswer(index)"
          type="button"
          class="bg-emerald-600 text-gray-100 col-span-3 rounded-lg flex flex-col gap-2"
        >
          <img
            :src="details.options.images[status.active - 1][index]"
            alt=""
            class="bg-gray-200 flex-1 aspect-video object-cover object-center rounded-lg"
          />

          <div class="w-full h-32 p-2 grid place-items-center">
            <p class="max-h-full line-clamp-4">
              {{ details.options.texts[status.active - 1][index] }}
            </p>
          </div>
        </button>
      </div>
    </div>

    <div
      v-if="started && finished"
      class="border-gray-300 bg-gray-100 w-8/12 h-4/6 border rounded-lg flex flex-col items-center justify-center"
    >
      <p class="text-3xl font-bold">{{ `Quiz ${route.params.id}` }}</p>
      <p class="mb-8 font-medium">{{ details.title }}</p>

      <PrimaryButton @click="endQuiz">Done</PrimaryButton>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { updateQuizScore } from "@/api/quizzes";

import PrimaryButton from "@/components/PrimaryButton.vue";

const router = useRouter();
const route = useRoute();
const storedQuiz = JSON.parse(localStorage.getItem(`quiz-${route.params.number}`));
const { status, details } = storedQuiz;
const started = ref(status.started);
const finished = ref(status.finished);
const active = ref(status.active);

const startQuiz = () => {
  status.started = true;
  status.active = 1;

  active.value = status.active;
  started.value = status.started;

  const updatedQuizString = JSON.stringify({ status, details });
  localStorage.setItem(`quiz-${route.params.number}`, updatedQuizString);
};

const checkAnswers = () => {
  let count = 0;

  for (let i = 0; i < details.answers.length; i++) {
    if (Number(details.answers[i]) === status.answers[i]) {
      count++;
    }
  }

  return count;
};

const selectAnswer = async (answer) => {
  status.active++;

  if (status.active > details.answers.length) {
    status.started = true;
    status.finished = true;
    status.active = 0;
    status.answers.push(answer);

    active.value = 0;
    finished.value = status.finished;

    const updatedQuizString = JSON.stringify({ status, details });
    localStorage.setItem(`quiz-${route.params.number}`, updatedQuizString);

    const storeProfile = JSON.parse(localStorage.getItem("profile"));
    updateQuizScore(storeProfile.id, details.id, checkAnswers());
  } else {
    active.value++;
    status.answers.push(answer);

    const updatedQuizString = JSON.stringify({ status, details });
    localStorage.setItem(`quiz-${route.params.number}`, updatedQuizString);
  }
};

const endQuiz = () => {
  router.push({ name: "quizzes" }).then(() => router.go(0));
};
</script>

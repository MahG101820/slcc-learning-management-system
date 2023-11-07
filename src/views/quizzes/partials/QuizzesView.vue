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
            item.quiz_type === 0
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
    v-if="profile.type === `teacher`"
    @click="navigateToCreateQuizView"
    type="button"
    class="border-stone-300 bg-stone-100 col-span-3 h-40 border rounded-lg transition-all hover:border-emerald-600 hover:scale-95 hover:shadow-lg"
  >
    <p class="text-xl font-medium">Add new quiz</p>
  </button>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-bold uppercase truncate">Delete quiz</p>
          <p class="text-xs">Confirm deleting this quiz</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div class="px-4">
        <p class="font-semibold">Do you really want to delete this quiz?</p>
        <p class="text-sm">This quiz will be deleted and it cannot be undone!</p>
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal"> Cancel </NeutralButton>
        <PrimaryButton type="submit" class="border-rose-600 bg-rose-600"> Delete </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { readQuizzes, readQuizItems, deleteQuizHeader } from "@/api/quizzes";
import { useProfileStore } from "@/stores/profile";
import { useQuizStore } from "@/stores/quiz";

import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const router = useRouter();
const profileStore = useProfileStore();
const quizStore = useQuizStore();
const profile = profileStore.profile;
const quiz = quizStore.quiz;
const quizzesList = await readQuizzes(profile.id);
const answeredQuizzes = JSON.parse(localStorage.getItem("answered-quizzes"));
const modal = ref();
const selectedQuizHeader = reactive({
  id: 0,
  number: 0
});

const quizzes = answeredQuizzes
  ? quizzesList
      .filter((item) => !answeredQuizzes.includes(item))
      .concat(answeredQuizzes.filter((item) => quizzesList.includes(item)))
  : quizzesList;

const showModal = async () => {
  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};

const submitForm = async () => {
  const response = await deleteQuizHeader(selectedQuizHeader.id);

  if (response === 200) {
    selectedQuizHeader.value = 0;

    alert(`Successfully deleted quiz ${selectedQuizHeader.number}`);

    unshowModal();
    router.go(0);
  }
};

const navigateToAnswerQuiz = async (id, number, type) => {
  if (profile.type === "teacher") {
    selectedQuizHeader.id = id;
    selectedQuizHeader.number = number;

    showModal();
  } else {
    const response = await readQuizItems(id);
    const textsList = [];
    const imagesList = [];

    response.detail.forEach((item) => {
      textsList.push(
        item.options
          .filter((_, index) => index % 2 === 0)
          .map((key) => key.split("text:")[1].trim())
      );
    });

    response.detail.forEach((item) => {
      imagesList.push(
        item.options
          .filter((_, index) => index % 2 !== 0)
          .map((key) => key.split("image:")[1].trim())
      );
    });

    quizStore.reset();

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
  }
};

const navigateToCreateQuizView = () => {
  window.open("https://slcc-learning-management-system.netlify.app/quizzes/create-quiz", "_blank");
};
</script>

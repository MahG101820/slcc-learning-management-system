<template>
  <section class="h-full space-y-4">
    <PrimaryButton @click="navigateToLessonsView()">
      <p>Back to lessons list</p>
    </PrimaryButton>

    <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg">
      <div class="relative">
        <img
          src="https://img.freepik.com/premium-vector/blank-math-template-with-math-tools-elements_1639-28076.jpg?w=740"
          alt="Lesson image"
          class="bg-gray-400 w-full h-48 rounded-t-lg object-cover object-center"
        />

        <div
          class="rounded-t-lg absolute inset-0 flex flex-col items-center justify-center backdrop-blur-lg"
        >
          <p class="text-3xl font-bold uppercase">Chapter {{ store.chapterNumber }}</p>
          <p class="mb-4 text-2xl">{{ store.chapterDescription }}</p>

          <p class="text-xl font-semibold uppercase">Lesson {{ store.number }}</p>
          <p class="text-lg">{{ store.description }}</p>
        </div>
      </div>

      <div class="p-4">
        <p v-html="store.content" id="content" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useLessonStore } from "@/stores/lesson";

import PrimaryButton from "@/components/PrimaryButton.vue";

const router = useRouter();
const store = useLessonStore();

const navigateToLessonsView = () => {
  store.reset();
  router.go(-1);
};
</script>

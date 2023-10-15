<template>
  <section class="h-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="navigateToLessonsView()">
        <ChevronLeftIcon />

        <p>{{ route.params.description }}</p>
      </PrimaryButton>

      <div v-if="store.chapterId && store.id" class="flex items-center gap-2">
        <IconedButton class="bg-sky-600 text-gray-100">
          <EditIcon />
        </IconedButton>

        <IconedButton class="bg-rose-600 text-gray-100">
          <DeleteIcon />
        </IconedButton>
      </div>
    </div>

    <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg">
      <div class="relative">
        <img
          :src="store.image"
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
import { useRouter, useRoute } from "vue-router";
import { useLessonStore } from "@/stores/lesson";

import PrimaryButton from "@/components/PrimaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";

const router = useRouter();
const route = useRoute();
const store = useLessonStore();

const navigateToLessonsView = () => {
  store.reset();
  router.go(-1);
};
</script>

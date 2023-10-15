<template>
  <div class="grid grid-cols-12 gap-2">
    <MaterialCard
      v-for="(item, index) in lessonsList"
      :key="index"
      :image="item.image"
      :title="`Lessons ${index + 1}`"
      :description="item.description"
      @click="navigateToReadLessonView(item, index + 1)"
    />

    <button
      type="button"
      class="border-gray-300 bg-gray-100 text-gray-700 col-span-3 h-64 border rounded-lg grid place-items-center"
    >
      <p class="text-xl font-bold">Add new lesson</p>
    </button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { readMaterials } from "@/api/materials";
import { useLessonStore } from "@/stores/lesson";

import MaterialCard from "@/components/MaterialCard.vue";

const router = useRouter();
const route = useRoute();
const store = useLessonStore();

const lessons = await readMaterials("lesson");
const lessonsList = lessons.filter((lesson) => lesson.chapter_id === Number(route.params.id));

const navigateToReadLessonView = (lesson, index) => {
  store.reset();

  store.chapterId = route.params.id;
  store.chapterNumber = route.params.number;
  store.chapterDescription = route.params.description;

  store.id = lesson.id;
  store.number = index;
  store.description = lesson.description;
  store.image = lesson.image;
  store.content = lesson.content;

  router.push({
    name: "materials-lesson",
    params: { id: lesson.id, number: index, description: lesson.description }
  });
};
</script>

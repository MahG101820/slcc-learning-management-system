<template>
  <div class="grid grid-cols-12 gap-2">
    <MaterialCard
      v-for="(item, index) in lessonsList"
      :key="index"
      :image="item.image"
      :title="`Lessons ${index + 1}`"
      :description="item.description"
      @click="navigateToReadLessonView(item.id, index + 1, item.description)"
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

import MaterialCard from "@/components/MaterialCard.vue";

const router = useRouter();
const route = useRoute();

const lessons = await readMaterials("lesson");
const lessonsList = lessons.filter((lesson) => lesson.chapter_id === Number(route.params.id));

const navigateToReadLessonView = (lessonId, lessonNumber, lessonDescription) => {
  router.push({
    name: "materials-lesson",
    params: { id: lessonId, number: lessonNumber, description: lessonDescription }
  });
};
</script>

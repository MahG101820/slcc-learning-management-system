<template>
  <div class="grid grid-cols-12 gap-x-2 gap-y-8">
    <template v-if="lessonsList.length">
      <MaterialCard
        v-for="(item, index) in lessonsList"
        :key="index"
        :image="item.image"
        :title="`Lessons ${index + 1}`"
        :description="item.description"
        @click="navigateToReadLessonView(item, index + 1)"
      />
    </template>

    <button
      v-if="storedProfile.type === `teacher`"
      @click="navigateToCreateLessonView(lessonsList.length + 1)"
      type="button"
      class="border-gray-300 bg-gray-100 text-gray-700 col-span-3 h-64 border rounded-lg grid place-items-center transition-all hover:border-emerald-600 hover:scale-95 hover:shadow-lg"
    >
      <p class="text-xl font-bold">Create new lesson</p>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { readMaterials } from "@/api/materials";
import { useReadingStore } from "@/stores/reading";
import { useChapterStore } from "@/stores/chapter";

import MaterialCard from "@/components/MaterialCard.vue";

const router = useRouter();
const chapterStore = useChapterStore();
const chapter = chapterStore.chapter;
const lessons = await readMaterials("lesson");
const lessonsList = lessons.filter((lesson) => lesson.chapter_id === chapter.id);

const storedProfile = JSON.parse(localStorage.getItem("profile"));

const navigateToReadLessonView = (lesson, index) => {
  const store = useReadingStore();

  store.reset();

  store.reading.chapter = {
    id: chapter.id,
    number: chapter.number,
    description: chapter.description,
    image: chapter.image
  };

  store.reading.lesson = {
    id: lesson.id,
    number: index,
    description: lesson.description,
    image: lesson.image,
    content: lesson.content
  };

  router.push({
    name: "materials-lesson",
    params: { id: index }
  });
};

const navigateToCreateLessonView = (id) => {
  router.push({
    name: "materials-lesson-create",
    params: { id: id }
  });
};
</script>

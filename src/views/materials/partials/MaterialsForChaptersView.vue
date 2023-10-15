<template>
  <section class="h-full grid grid-cols-12 gap-2">
    <MaterialCard
      v-for="(item, index) in chapters"
      :key="index"
      image="item.image"
      :title="`Chapters ${index + 1}`"
      :description="item.description"
      @click="navigateToLessonsView(item.id, index + 1, item.description)"
    />

    <button
      type="button"
      class="border-gray-300 bg-gray-100 text-gray-700 col-span-3 h-64 border rounded-lg grid place-items-center"
    >
      <p class="text-xl font-bold">Add new chapter</p>
    </button>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { readMaterials } from "@/api/materials";

import MaterialCard from "@/components/MaterialCard.vue";

const router = useRouter();
const chapters = await readMaterials("chapter");

const navigateToLessonsView = (chapterId, chapterNumber, chapterDescription) => {
  router.push({
    name: "materials-lessons",
    params: { id: chapterId, number: chapterNumber, description: chapterDescription }
  });
};
</script>

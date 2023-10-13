<template>
  <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg flex flex-col">
    <img
      :src="recentlyAddedChapter.image"
      alt="Recently added chapter's image"
      class="bg-gray-300 w-full aspect-video object-cover rounded-t-lg"
    />

    <div class="p-4 flex items-center justify-between gap-4">
      <div class="flex-1 grid">
        <p class="font-semibold truncate">{{ `Chapter ${recentlyAddedChapter.number}` }}</p>
        <p class="text-sm truncate">{{ recentlyAddedChapter.description }}</p>
      </div>

      <PrimaryButton> <p>Read</p> </PrimaryButton>
    </div>
  </div>

  <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg flex flex-col">
    <img
      :src="recentlyAddedLesson.image"
      alt="Recently added lesson's image"
      class="bg-gray-300 w-full aspect-video object-cover rounded-t-lg"
    />

    <div class="my-auto px-4 flex items-center justify-between gap-4">
      <div class="flex-1 grid">
        <p class="font-semibold truncate">{{ `Lesson ${recentlyAddedLesson.number}` }}</p>
        <p class="text-sm truncate">{{ recentlyAddedLesson.description }}</p>
      </div>

      <PrimaryButton> <p>Read</p> </PrimaryButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { readMaterials } from "@/api/materials";

import PrimaryButton from "@/components/PrimaryButton.vue";

const recentlyAddedChapter = ref({});
const recentlyAddedLesson = ref({});

const getRecentlyAdded = async (type) => {
  const materials = await readMaterials(type);
  const recentlyAdded = materials[materials.length - 1];
  const number =
    type === "lesson"
      ? materials.filter((key) => key.chapter_id === recentlyAdded.chapter_id).length
      : materials.length;

  return {
    id: recentlyAdded.id,
    number: number,
    description: recentlyAdded.description,
    image: recentlyAdded.image
  };
};

recentlyAddedChapter.value = await getRecentlyAdded("chapter");
recentlyAddedLesson.value = await getRecentlyAdded("lesson");
</script>

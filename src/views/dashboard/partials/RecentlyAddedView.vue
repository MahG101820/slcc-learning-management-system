<template>
  <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg flex flex-col">
    <img
      @error="handleErrorOnLoading(`chapter`)"
      :src="recentlyAddedChapter.image"
      alt="Recently added chapter's image"
      class="bg-gray-300 w-full aspect-video object-cover rounded-t-lg"
    />

    <div class="p-4 flex items-center justify-between gap-4">
      <div class="flex-1 grid">
        <p class="font-semibold truncate">{{ `Chapter ${recentlyAddedChapter.number}` }}</p>
        <p class="text-sm truncate">{{ recentlyAddedChapter.description }}</p>
      </div>

      <PrimaryButton @click="navigateToRecentlyAddedChapter()"> View lessons </PrimaryButton>
    </div>
  </div>

  <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg flex flex-col">
    <img
      @error="handleErrorOnLoading(`lesson`)"
      :src="recentlyAddedLesson.image"
      alt="Recently added lesson's image"
      class="bg-gray-300 w-full aspect-video object-cover rounded-t-lg"
    />

    <div class="my-auto px-4 flex items-center justify-between gap-4">
      <div class="flex-1 grid">
        <p class="font-semibold truncate">
          {{ `Chapter ${recentlyAddedLesson.chapter}: Lesson ${recentlyAddedLesson.number}` }}
        </p>
        <p class="text-sm truncate">{{ recentlyAddedLesson.description }}</p>
      </div>

      <PrimaryButton> Read lesson </PrimaryButton>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { readMaterials } from "@/api/materials";

import PrimaryButton from "@/components/PrimaryButton.vue";
import ImagePlaceholder from "@/assets/img/ImagePlaceholder.jpg";

const router = useRouter();

// get recently added chapter
const recentlyAddedChapter = reactive({});
const chapters = await readMaterials("chapter");
const chapter = chapters[chapters.length - 1];

// assigning values to recently added chapter variable
recentlyAddedChapter.id = chapter.id;
recentlyAddedChapter.number = chapters.length;
recentlyAddedChapter.description = chapter.description;
recentlyAddedChapter.image = chapter.image;

// get recently added lesson
const recentlyAddedLesson = reactive({});
const lessons = await readMaterials("lesson");
const lesson = lessons[lessons.length - 1];

// assigning values to recently added lesson variable
recentlyAddedLesson.id = lesson.id;
recentlyAddedLesson.chapter = chapters.findIndex((key) => key.id === lesson.chapter_id) + 1;
recentlyAddedLesson.number = lessons.filter((key) => key.chapter_id === lesson.chapter_id).length;
recentlyAddedLesson.description = lesson.description;
recentlyAddedLesson.image = lesson.image;

// handle error on loading images
const handleErrorOnLoading = (source) => {
  if (source === "chapter") {
    recentlyAddedChapter.image = ImagePlaceholder;
  } else {
    recentlyAddedLesson.image = ImagePlaceholder;
  }
};

// navigate to recently added chapter
const navigateToRecentlyAddedChapter = () => {
  router.push({
    name: "materials-lessons",
    params: {
      id: recentlyAddedChapter.id,
      number: recentlyAddedChapter.number,
      description: recentlyAddedChapter.description
    }
  });
};
</script>

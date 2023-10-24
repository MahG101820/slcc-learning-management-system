<template>
  <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg flex flex-col">
    <img
      @error="handleErrorOnLoading(`chapter`)"
      :src="recentlyAdded.chapter.image"
      alt="Recently added chapter's image"
      class="bg-gray-300 w-full aspect-video object-cover rounded-t-lg"
    />

    <div class="p-4 flex items-center justify-between gap-4">
      <template v-if="recentlyAdded.chapter.id === 0">
        <div class="flex-1 grid">
          <p class="font-semibold truncate">Oops! No Chapter(s) Found</p>
          <p class="text-sm truncate">It seems like there is no currently available chapter(s).</p>
        </div>
      </template>

      <template v-else>
        <div class="flex-1 grid">
          <p class="font-semibold truncate">{{ `Chapter ${recentlyAdded.chapter.number}` }}</p>
          <p class="text-sm truncate">{{ recentlyAdded.chapter.description }}</p>
        </div>

        <PrimaryButton @click="navigateToRecentlyAddedChapter"> View lessons </PrimaryButton>
      </template>
    </div>
  </div>

  <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg flex flex-col">
    <img
      @error="handleErrorOnLoading(`lesson`)"
      :src="recentlyAdded.lesson.image"
      alt="Recently added lesson's image"
      class="bg-gray-300 w-full aspect-video object-cover rounded-t-lg"
    />

    <div class="my-auto px-4 flex items-center justify-between gap-4">
      <template v-if="recentlyAdded.lesson.id === 0">
        <div class="flex-1 grid">
          <p class="font-semibold truncate">Oops! No Lesson(s) Found</p>
          <p class="text-sm truncate">It seems like there is no currently available lesson(s).</p>
        </div>
      </template>

      <template v-else>
        <div class="flex-1 grid">
          <p class="font-semibold truncate">
            {{
              `Chapter ${recentlyAdded.lesson.chapterNumber}: Lesson ${recentlyAdded.lesson.number}`
            }}
          </p>
          <p class="text-sm truncate">{{ recentlyAdded.lesson.description }}</p>
        </div>

        <PrimaryButton @click="navigateToRecentlyAddedLesson"> Read lesson </PrimaryButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { readMaterials } from "@/api/materials";
import { useChapterStore } from "@/stores/chapter";
import { useReadingStore } from "@/stores/reading";

import PrimaryButton from "@/components/PrimaryButton.vue";
import ImagePlaceholder from "@/assets/img/ImagePlaceholder.jpg";

const router = useRouter();
const chapterStore = useChapterStore();
const readingStore = useReadingStore();
const recentlyAdded = reactive({
  chapter: {
    id: 0,
    number: 0,
    description: "",
    image: 0
  },

  lesson: {
    chapterId: 0,
    chapterNumber: 0,
    chapterDescription: "",

    id: 0,
    number: 0,
    description: "",
    image: "",
    content: ""
  }
});

const chaptersList = await readMaterials("chapter");

if (chaptersList.length) {
  const chapter = chaptersList[chaptersList.length - 1];

  recentlyAdded.chapter = {
    id: chapter.id,
    number: chaptersList.length,
    description: chapter.description,
    image: chapter.image
  };

  const response = await readMaterials("lesson");
  const lessonsList = response.filter(
    (key) =>
      key.description !== null && chaptersList.map((chapter) => chapter.id).includes(key.chapter_id)
  );

  if (lessonsList.length) {
    const lesson = lessonsList[lessonsList.length - 1];

    recentlyAdded.lesson = {
      chapterId: lesson.chapter_id,
      chapterNumber: chaptersList.findIndex((key) => key.id === lesson.chapter_id) + 1,
      chapterDescription: chaptersList.find((key) => key.id === lesson.chapter_id).description,

      id: lesson.id,
      number: lessonsList.filter((key) => key.chapter_id === lesson.chapter_id).length,
      description: lesson.description,
      image: lesson.image,
      content: lesson.content
    };
  }
}

const handleErrorOnLoading = (source) => {
  if (source === "chapter") {
    recentlyAdded.chapter.image = ImagePlaceholder;
  } else {
    recentlyAdded.lesson.image = ImagePlaceholder;
  }
};

const navigateToRecentlyAddedChapter = () => {
  chapterStore.reset();

  chapterStore.chapter = {
    id: recentlyAdded.chapter.id,
    number: recentlyAdded.chapter.number,
    description: recentlyAdded.chapter.description,
    image: recentlyAdded.chapter.image
  };

  router.push({
    name: "materials-chapter",
    params: {
      id: recentlyAdded.chapter.number
    }
  });
};

const navigateToRecentlyAddedLesson = () => {
  readingStore.reset();

  readingStore.reading.chapter = {
    id: recentlyAdded.lesson.chapterId,
    number: recentlyAdded.lesson.chapterNumber,
    description: recentlyAdded.lesson.chapterDescription
  };

  readingStore.reading.lesson = {
    id: recentlyAdded.lesson.id,
    number: recentlyAdded.lesson.number,
    description: recentlyAdded.lesson.description,
    image: recentlyAdded.lesson.image,
    content: recentlyAdded.lesson.content
  };

  router.push({
    name: "materials-lesson",
    params: {
      id: recentlyAdded.lesson.number
    }
  });
};
</script>

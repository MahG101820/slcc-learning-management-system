<template>
  <div class="grid grid-cols-12 gap-x-2 gap-y-8">
    <MaterialCard
      v-for="(item, index) in lessonsList"
      :key="index"
      :image="item.image"
      :title="`Lessons ${index + 1}`"
      :description="item.description"
      @click="navigateToReadLessonView(item, index + 1)"
    />

    <button
      @click="showModal"
      type="button"
      class="border-gray-300 bg-gray-100 text-gray-700 col-span-3 h-64 border rounded-lg grid place-items-center"
    >
      <p class="text-xl font-bold">Create new lesson</p>
    </button>
  </div>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent=""
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="font-bold uppercase truncate">Create new lesson</p>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div class="space-y-2">
        <InputText id="title" label="Description" required />

        <input type="file" id="image" class="hidden" name="image" accept="image/png, image/jpeg" />

        <img
          :src="DefaultMaterialImage"
          alt="Material image"
          class="bg-gray-200 w-full aspect-video rounded-lg object-cover object-center"
        />

        <label
          for="image"
          class="border-emerald-600 bg-emerald-600 text-gray-100 w-max px-4 py-2 border rounded-lg flex items-center gap-4 cursor-pointer"
        >
          Upload image
        </label>
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal"> Cancel </NeutralButton>

        <PrimaryButton type="submit"> Create </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { readMaterials } from "@/api/materials";
import { useReadingStore } from "@/stores/reading";
import { useChapterStore } from "@/stores/chapter";

import MaterialCard from "@/components/MaterialCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import DefaultMaterialImage from "@/assets/img/DefaultMaterialImage.jpg";

const router = useRouter();
const route = useRoute();
const store = useChapterStore();
const modal = ref(null);
const lessons = await readMaterials("lesson");
const lessonsList = lessons.filter((lesson) => lesson.chapter_id === store.chapter.id);

const navigateToReadLessonView = (lesson, index) => {
  const store = useReadingStore();

  store.reset();

  store.reading.chapter = {
    id: route.params.id,
    number: route.params.number,
    description: route.params.description
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
    params: { id: lesson.id, number: index, description: lesson.description }
  });
};

const showModal = () => {
  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};
</script>

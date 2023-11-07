<template>
  <section class="h-full flex flex-col gap-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="showModal(`cancel`)">
        <ChevronLeftIcon />

        <p>Create new lesson</p>
      </PrimaryButton>

      <div class="flex gap-2">
        <NeutralButton @click="showModal(`cancel`)"> Cancel </NeutralButton>

        <PrimaryButton @click="showModal(`save`)"> Save </PrimaryButton>
      </div>
    </div>

    <div class="border-gray-300 bg-gray-100 flex-1 p-4 border rounded-lg space-y-4">
      <div class="flex items-center gap-4 justify-between">
        <InputText v-model.trim="lesson.description" id="title" label="Title" class="flex-1" />

        <input
          @change="handleImageUploading"
          type="file"
          id="image"
          class="hidden"
          name="image"
          accept="image/png, image/jpeg"
        />

        <label
          for="image"
          class="border-emerald-600 bg-emerald-600 text-gray-100 w-max px-4 py-2 border rounded-lg flex items-center gap-4 cursor-pointer"
        >
          Upload background image
        </label>
      </div>

      <div>
        <QuillEditor
          v-model:content="lesson.content"
          :toolbar="[
            [{ header: 1 }, { header: 2 }],
            [`bold`, `italic`, `underline`],
            [{ indent: `+1` }, { indent: `-1` }],
            [{ list: `ordered` }, { list: `bullet` }],
            [`image`]
          ]"
          theme="snow"
          contentType="html"
        />
      </div>
    </div>
  </section>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-bold uppercase truncate">{{ modalProperties.title }}</p>
          <p class="text-xs">{{ modalProperties.subtitle }}</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <template v-if="modalProperties.target === `cancel`">
        <div class="px-4">
          <p class="font-semibold">Do you really want to cancel creating this lesson?</p>
          <p class="text-sm">This lesson will be deleted and it cannot be undone!</p>
        </div>

        <div class="flex items-center justify-end gap-2">
          <NeutralButton @click="unshowModal"> Don't cancel </NeutralButton>
          <PrimaryButton @click="navigateToReadLessonView" class="border-rose-600 bg-rose-600">
            Cancel
          </PrimaryButton>
        </div>
      </template>

      <template v-else>
        <div class="px-4">
          <p class="font-semibold">Do you really want to save this new lesson?</p>
          <p class="text-sm">Once saved, you can edit and delete it later</p>
        </div>

        <div class="flex items-center justify-end gap-2">
          <NeutralButton @click="unshowModal"> Cancel </NeutralButton>
          <PrimaryButton :disabled="loading" type="submit"> Save </PrimaryButton>
        </div>
      </template>
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { uploadImage, downloadImage } from "@/firebase/storage";
import { createMaterials } from "@/api/materials";
import { useChapterStore } from "@/stores/chapter";

import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import DefaultLessonBackground from "@/assets/img/DefaultLessonBackground.webp";

const chapterStore = useChapterStore();
const chapter = chapterStore.chapter;
const router = useRouter();
const route = useRoute();
const modal = ref(null);
const modalProperties = reactive({
  target: "",
  title: "",
  subtitle: ""
});
const lesson = reactive({
  chapter_id: chapter.id,
  description: null,
  image: null,
  content: null
});
const loading = ref(false);

const navigateToReadLessonView = () => {
  router.go(-1);
};

const showModal = (target) => {
  const hasDescription = lesson.description ? true : false;
  const hasContent = lesson.content ? (lesson.content === "<p><br></p>" ? false : true) : false;

  modalProperties.target = target;

  if (target === "cancel") {
    modalProperties.title = "Cancel creating new lesson";
    modalProperties.subtitle = "Confirm canceling creating this lesson";
    modal.value.showModal();
  } else if (target !== "cancel" && hasDescription && hasContent) {
    modalProperties.title = "Create new lesson";
    modalProperties.subtitle = "Confirm creating this lesson";
    modal.value.showModal();
  }
};

const unshowModal = () => {
  modal.value.close();
};

const handleImageUploading = (event) => {
  lesson.image = event.target.files[0];
};

const submitForm = async () => {
  const result = ref(null);

  loading.value = true;

  if (lesson.image === null) {
    const response = await fetch(DefaultLessonBackground);
    const result = await response.blob();
    lesson.image = result;
  }

  const response = await uploadImage(lesson.image, `lessons/lesson${route.params.id}`);
  result.value = response;

  watchEffect(async () => {
    if (result.value === "success") {
      const imageUrl = await downloadImage(`lessons/lesson${route.params.id}`);

      lesson.image = imageUrl;

      const response = await createMaterials("lesson", lesson);

      if (response.status_code === 200) {
        loading.value = false;
        result.value = null;

        alert(
          `New chapter successfully created! \nChapter ${route.params.id}: ${lesson.description}`
        );

        unshowModal();

        router.go(-1);
      }
    }
  });
};
</script>

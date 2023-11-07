<template>
  <section class="h-full flex flex-col gap-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="navigateToReadLessonView">
        <ChevronLeftIcon />

        <p>{{ `Lesson ${reading.lesson.number}` }}</p>
      </PrimaryButton>

      <div class="flex gap-2">
        <NeutralButton @click="showModal(`cancel`)"> Cancel </NeutralButton>

        <PrimaryButton @click="showModal(`save`)"> Save </PrimaryButton>
      </div>
    </div>

    <div class="border-gray-300 bg-gray-100 flex-1 p-4 border rounded-lg space-y-4">
      <div class="flex items-center gap-4 justify-between">
        <InputText
          v-model.trim="reading.lesson.description"
          id="title"
          label="Title"
          class="flex-1"
        />

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
          v-model:content="reading.lesson.content"
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
          <p class="font-bold uppercase truncate">Edit lesson</p>
          <p class="text-xs">
            {{ `Lesson ${reading.lesson.number}: ${reading.lesson.description}` }}
          </p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div class="space-y-2">
        <InputText id="title" label="Description" class="mb-4" required />

        <input
          @change="handleImageUploading"
          type="file"
          id="image"
          class="hidden"
          name="image"
          accept="image/png, image/jpeg"
        />

        <img
          :src="file ? file : DefaultMaterialImage"
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

        <PrimaryButton :disabled="loading" type="submit"> Save </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useReadingStore } from "@/stores/reading";

import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const router = useRouter();
const readingStore = useReadingStore();
const reading = readingStore.reading;
const modal = ref();
const lesson = reactive({
  description: "",
  content: "",
  image: null
});

console.log(reading);
console.log(lesson);

const navigateToReadLessonView = () => {
  router.go(-1);
};

const showModal = () => {
  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};
</script>

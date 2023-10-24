<template>
  <section class="h-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="navigateToReadLessonView">
        <ChevronLeftIcon />

        <p>{{ `Lesson ${storeReading.reading.lesson.number}` }}</p>
      </PrimaryButton>

      <IconedButton @click="showModal" class="bg-sky-600 text-gray-100">
        <EditIcon />
      </IconedButton>
    </div>

    <div></div>
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
            {{
              `Lesson ${storeReading.reading.lesson.number}: ${storeReading.reading.lesson.description}`
            }}
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useReadingStore } from "@/stores/reading";

import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const router = useRouter();
const storeReading = useReadingStore();
const modal = ref();

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

<template>
  <section class="h-full grid grid-cols-12 gap-x-2 gap-y-8">
    <MaterialCard
      v-for="(item, index) in chapters"
      :key="index"
      :image="item.image"
      :title="`Chapter ${index + 1}`"
      :description="item.description"
      @click="navigateToLessonsView(item, index + 1)"
    />

    <button
      @click="showModal"
      type="button"
      class="border-gray-300 bg-gray-100 text-gray-700 col-span-3 h-64 text-xl font-bold border rounded-lg grid place-items-center"
    >
      Create new chapter
    </button>
  </section>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-bold uppercase truncate">Create new chapter</p>
          <p class="text-xs">Chapter {{ chapters.length + 1 }}</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div class="space-y-2">
        <InputText
          v-model.trim="chapter.description"
          id="title"
          label="Description"
          class="mb-4"
          required
        />

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

        <PrimaryButton :disabled="loading" type="submit"> Create </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { createMaterials, readMaterials } from "@/api/materials";
import { uploadImage, downloadImage } from "@/firebase/storage";
import { useChapterStore } from "@/stores/chapter";

import MaterialCard from "@/components/MaterialCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import DefaultMaterialImage from "@/assets/img/DefaultMaterialImage.jpg";

const router = useRouter();
const chapters = await readMaterials("chapter");
const store = useChapterStore();
const modal = ref(null);
const file = ref(null);
const loading = ref(false);
const chapter = reactive({
  description: "",
  image: DefaultMaterialImage
});

const navigateToLessonsView = (chapter, index) => {
  store.reset();

  store.chapter = {
    id: chapter.id,
    number: index,
    description: chapter.description,
    image: chapter.image
  };

  router.push({
    name: "materials-chapter",
    params: { id: index }
  });
};

const reset = () => {
  URL.revokeObjectURL(file.value);
  file.value = null;
  chapter.description = "";
  chapter.image = DefaultMaterialImage;
};

const showModal = () => {
  reset();
  modal.value.showModal();
};

const unshowModal = () => {
  reset();
  modal.value.close();
};

const handleImageUploading = (event) => {
  URL.revokeObjectURL(file.value);
  file.value = null;

  chapter.image = event.target.files[0];
  file.value = URL.createObjectURL(chapter.image);
};

const submitForm = async () => {
  const result = ref(null);

  loading.value = true;

  if (typeof chapter.image === "string") {
    const response = await fetch(DefaultMaterialImage);
    const result = await response.blob();
    chapter.image = result;
  }

  const response = await uploadImage(chapter.image, `chapters/chapter${chapters.length + 1}`);
  result.value = response;

  watchEffect(async () => {
    if (result.value === "success") {
      const imageUrl = await downloadImage(`chapters/chapter${chapters.length + 1}`);

      chapter.image = imageUrl;

      const response = await createMaterials("chapter", chapter);

      if (response.status_code === 200) {
        loading.value = false;
        result.value = null;

        alert(
          `New chapter successfully created! \nChapter ${chapters.length + 1}: ${
            chapter.description
          }`
        );

        unshowModal();

        router.go(0);
      }
    }
  });
};
</script>

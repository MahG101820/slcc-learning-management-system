<template>
  <section class="h-full grid grid-cols-12 gap-x-2 gap-y-8">
    <MaterialCard
      v-for="(item, index) in chapters"
      :key="index"
      image="item.image"
      :title="`Chapter ${index + 1}`"
      :description="item.description"
      @click="navigateToLessonsView(item.id, index + 1, item.description)"
    />

    <button
      @click="showModal"
      type="button"
      class="border-gray-300 bg-gray-100 text-gray-700 col-span-3 h-64 border rounded-lg grid place-items-center"
    >
      <p class="text-xl font-bold">Create new chapter</p>
    </button>
  </section>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="font-bold uppercase truncate">Create new chapter</p>

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
          :src="chapter.image"
          alt="Material image"
          class="bg-gray-200 w-full aspect-video rounded-lg object-cover object-center"
        />

        <label
          for="image"
          class="border-emerald-600 bg-emerald-600 text-gray-100 w-max px-4 py-2 border rounded-lg flex items-center gap-4 cursor-pointer"
        >
          <p>Upload image</p>
        </label>
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal">
          <p>Cancel</p>
        </NeutralButton>

        <PrimaryButton type="submit">
          <p>Create</p>
        </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { readMaterials } from "@/api/materials";

import MaterialCard from "@/components/MaterialCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import DefaultMaterialImage from "@/assets/img/DefaultMaterialImage.jpg";

const router = useRouter();
const chapters = await readMaterials("chapter");
const modal = ref(null);
const file = ref(null);
const chapter = reactive({
  description: "",
  image: DefaultMaterialImage
});

const navigateToLessonsView = (chapterId, chapterNumber, chapterDescription) => {
  router.push({
    name: "materials-lessons",
    params: { id: chapterId, number: chapterNumber, description: chapterDescription }
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
  const uploadedImage = event.target.files[0];
  file.value = URL.createObjectURL(uploadedImage);
  chapter.image = file.value; 
};

const submitForm = () => {};
</script>

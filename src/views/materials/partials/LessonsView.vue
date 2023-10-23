<template>
  <section class="h-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="navigateToChaptersView">
        <ChevronLeftIcon />

        <p>{{ `Chapter ${store.chapter.number}` }}</p>
      </PrimaryButton>

      <div v-if="materialsForLessonsView" class="flex items-center gap-2">
        <IconedButton @click="showModal(`edit`)" class="bg-sky-600 text-gray-100">
          <EditIcon />
        </IconedButton>

        <IconedButton @click="showModal(`delete`)" class="bg-rose-600 text-gray-100">
          <DeleteIcon />
        </IconedButton>
      </div>
    </div>

    <Suspense>
      <template #default>
        <MaterialsForLessonsView ref="materialsForLessonsView" />
      </template>

      <template #fallback>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="border-gray-300 bg-gray-300 col-span-3 h-64 border rounded-lg animate-pulse"
          />
        </div>
      </template>
    </Suspense>
  </section>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-bold uppercase truncate">Create new chapter</p>
          <p class="text-xs">
            {{ `Chapter ${store.chapter.number}: ${store.chapter.description}` }}
          </p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div v-if="modalTitle === `Edit chapter`" class="space-y-2">
        <InputText v-model.trim="chapter.description" id="title" label="Description" required />

        <input
          @change="handleImageUploading"
          type="file"
          id="image"
          class="hidden"
          name="image"
          accept="image/png, image/jpeg"
        />

        <img
          :src="file ? file : store.chapter.image"
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

      <div v-else class="px-4">
        <p class="font-semibold">Do you really want to delete this chapter?</p>
        <p class="text-sm">
          All lesson(s) in this chapter will also be deleted and it cannot be undone!
        </p>
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal"> Cancel </NeutralButton>

        <PrimaryButton
          :disabled="loading"
          type="submit"
          :class="
            modalTitle === `Edit chapter`
              ? `border-emerald-600 bg-emerald-600`
              : `border-rose-600 bg-rose-600`
          "
        >
          {{ modalTitle === "Edit chapter" ? "Save" : "Delete" }}
        </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, reactive, watchEffect } from "vue";
import { uploadImage, downloadImage } from "@/firebase/storage";
import { updateMaterials, deleteMaterials } from "@/api/materials";
import { useChapterStore } from "@/stores/chapter";

import MaterialsForLessonsView from "@/views/materials/partials/MaterialsForLessonsView.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const router = useRouter();
const store = useChapterStore();
const modal = ref(null);
const modalTitle = ref("");
const materialsForLessonsView = ref(null);
const loading = ref(false);
const file = ref(null);
const chapter = reactive({
  id: store.chapter.id,
  description: "",
  image: ""
});

const navigateToChaptersView = () => {
  router.push({ name: "materials" });
};

const reset = () => {
  URL.revokeObjectURL(file.value);
  file.value = null;
  chapter.description = "";
  chapter.image = "";
};

const showModal = (operation) => {
  reset();
  modalTitle.value = operation === "edit" ? "Edit chapter" : "Delete chapter";
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

  const response = await uploadImage(chapter.image, `chapters/chapter${store.chapter.number}`);
  result.value = response;

  watchEffect(async () => {
    if (result.value === "success") {
      const imageUrl = await downloadImage(`chapters/chapter${store.chapter.number}}`);

      chapter.image = imageUrl;

      if (modalTitle.value === "Edit chapter") {
        chapter.image = chapter.image ? chapter.image : store.chapter.image;

        const response = await updateMaterials("chapter", chapter);

        if (response.status_code === 200) {
          loading.value = false;

          alert(`Chapter ${store.chapter.id} successfully updated!`);
        }
      } else {
        const response = await deleteMaterials("chapter", store.chapter.id);

        if (response === 200) {
          loading.value = false;

          alert(`Chapter ${store.chapter.id} successfully deleted!`);
        }
      }

      loading.value = false;
      result.value = null;

      unshowModal();

      router.push({ name: "materials" });
    }
  });
};
</script>

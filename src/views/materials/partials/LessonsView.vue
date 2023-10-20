<template>
  <section class="h-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="navigateToChaptersView()">
        <ChevronLeftIcon />

        <p>{{ `Chapter ${route.params.number}` }}</p>
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
      @submit.prevent=""
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="font-bold uppercase truncate">{{ modalTitle }}</p>

        <IconedButton @click="unshowModal()">
          <CloseIcon />
        </IconedButton>
      </div>

      <div v-if="modalTitle === `Edit lesson`" class="space-y-2">
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
          <p>Upload image</p>
        </label>
      </div>

      <div v-else class="px-4">
        <p class="font-semibold">Do you really want to delete this chapter?</p>
        <p class="text-sm">
          All lesson(s) in this chapter will also be deleted and it cannot be undone!
        </p>
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal()">
          <p>Cancel</p>
        </NeutralButton>

        <PrimaryButton type="submit" class="border-rose-600 bg-rose-600">
          <p>Delete</p>
        </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

import MaterialsForLessonsView from "@/views/materials/partials/MaterialsForLessonsView.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import InputText from "@/components/InputText.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import DefaultMaterialImage from "@/assets/img/DefaultMaterialImage.jpg";

const router = useRouter();
const route = useRoute();
const modal = ref(null);
const modalTitle = ref("");
const materialsForLessonsView = ref(null);

const navigateToChaptersView = () => {
  router.push({ name: "materials" });
};

const showModal = (operation) => {
  modalTitle.value = operation === "edit" ? "Edit lesson" : "Delete lesson";
  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};
</script>

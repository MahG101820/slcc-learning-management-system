<template>
  <section class="h-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="navigateToLessonsView()">
        <ChevronLeftIcon />

        <p>{{ `Lesson ${route.params.number}` }}</p>
      </PrimaryButton>

      <div v-if="chapter.id && lesson.id" class="flex items-center gap-2">
        <IconedButton @click="showModal(`edit`)" class="bg-sky-600 text-gray-100">
          <EditIcon />
        </IconedButton>

        <IconedButton @click="showModal(`delete`)" class="bg-rose-600 text-gray-100">
          <DeleteIcon />
        </IconedButton>
      </div>
    </div>

    <div class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg">
      <div class="relative">
        <img
          :src="lesson.image"
          alt="Lesson image"
          class="bg-gray-400 w-full h-48 rounded-t-lg object-cover object-center"
        />

        <div
          class="rounded-t-lg absolute inset-0 flex flex-col items-center justify-center backdrop-blur-lg"
        >
          <p class="text-3xl font-bold uppercase">Chapter {{ chapter.number }}</p>
          <p class="mb-4 text-2xl">{{ chapter.description }}</p>

          <p class="text-xl font-semibold uppercase">Lesson {{ lesson.number }}</p>
          <p class="text-lg">{{ lesson.description }}</p>
        </div>
      </div>

      <div class="p-4">
        <p v-html="lesson.content" id="content" />
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
          <p class="font-bold uppercase truncate">{{ modalTitle }}</p>
          <p class="text-xs">
            {{ `Lesson ${lesson.number}: ${lesson.description}` }}
          </p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div v-if="modalTitle === `Edit lesson`" class="space-y-2">
        <p>Edit lesson -></p>
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
            modalTitle === `Edit lesson`
              ? `border-emerald-600 bg-emerald-600`
              : `border-rose-600 bg-rose-600`
          "
        >
          {{ modalTitle === "Edit lesson" ? "Save" : "Delete" }}
        </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useReadingStore } from "@/stores/reading";

import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";

const router = useRouter();
const route = useRoute();
const modal = ref(null);
const modalTitle = ref();
const store = useReadingStore();
const { chapter, lesson } = toRefs(store.reading);

const navigateToLessonsView = () => {
  store.reset();
  router.go(-1);
};

const showModal = (operation) => {
  modalTitle.value = operation === "edit" ? "Edit lesson" : "Delete lesson";

  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};
</script>

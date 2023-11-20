<template>
  <section class="h-full flex flex-col gap-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="showModal(`cancel`)">
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
          theme="snow"
          contentType="html"
          toolbar="#my-toolbar"
        >
          <template #toolbar>
            <div id="my-toolbar">
              <button class="ql-header" value="1" />
              <button class="ql-header" value="2" />
              <button class="ql-bold" />
              <button class="ql-italic" />
              <button class="ql-underline" />
              <button class="ql-list" value="ordered" />
              <button class="ql-list" value="bullet" />
              <button class="ql-image" />
              <button class="ql-video" />
            </div>
          </template>
        </QuillEditor>
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
import { useRouter } from "vue-router";
import { useReadingStore } from "@/stores/reading";
import { updateMaterials } from "@/api/materials";
import { uploadImage, downloadImage } from "@/firebase/storage";

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
const modalProperties = reactive({
  target: "",
  title: "",
  subtitle: ""
});
const lesson = reactive({
  chapter_id: reading.chapter.id,
  id: reading.lesson.id,
  description: reading.lesson.description,
  content: reading.lesson.content,
  image: reading.lesson.image
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
    if (
      !(
        reading.lesson.description === lesson.description &&
        reading.lesson.content === lesson.content &&
        reading.lesson.image === lesson.image
      )
    ) {
      modalProperties.title = "Create new lesson";
      modalProperties.subtitle = "Confirm creating this lesson";
      modal.value.showModal();
    }
  }
};

const unshowModal = () => {
  modal.value.close();
};

const handleImageUploading = (event) => {
  lesson.image = event.target.files[0];
};

const submitForm = async () => {
  loading.value = true;

  if (lesson.image === reading.lesson.image) {
    const response = await updateMaterials("lesson", lesson);

    if (response.status_code === 200) {
      loading.value = false;

      alert(
        `Successfully updated Chapter ${reading.chapter.number}: Lesson ${reading.lesson.number}`
      );

      reading.lesson.description = lesson.description;
      reading.lesson.content = lesson.content;
      reading.lesson.image = lesson.image;

      loading.value = false;
      unshowModal();
      router.go(-1);
    }
  } else {
    const result = ref(null);
    const response = await uploadImage(lesson.image, `lessons/lesson${reading.lesson.number}`);

    result.value = response;

    watchEffect(async () => {
      if (result.value === "success") {
        const imageUrl = await downloadImage(`lessons/lesson${reading.lesson.number}`);

        lesson.image = imageUrl;

        const response = await updateMaterials("lesson", lesson);

        if (response.status_code === 200) {
          result.value = null;
          loading.value = false;

          alert(
            `Successfully updated Chapter ${reading.chapter.number}: Lesson ${reading.lesson.number}`
          );

          reading.lesson.description = lesson.description;
          reading.lesson.content = lesson.content;
          reading.lesson.image = lesson.image;

          loading.value = false;
          unshowModal();
          router.go(-1);
        }
      }
    });
  }
};
</script>

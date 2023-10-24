<template>
  <div class="border-gray-300 bg-gray-100 text-gray-700 w-6/12 p-4 border rounded-lg space-y-8">
    <div class="my-2 flex flex-col items-center gap-4">
      <img
        src=""
        alt="Profile picture"
        class="border-emerald-600 bg-gray-300 w-48 aspect-square border-4 rounded-full object-cover object-center"
      />

      <PrimaryButton @click="showModal(`image`)"> Change image </PrimaryButton>
    </div>

    <div>
      <p class="text-xl font-bold uppercase">Full name</p>

      <div class="px-4 py-2 flex items-center gap-2">
        <p
          class="border-gray-300 bg-gray-200 text-gray-800 flex-1 px-4 py-2 text-sm truncate border rounded-lg"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, nihil.
        </p>

        <IconedButton @click="showModal(`name`)" class="bg-sky-600 text-gray-100">
          <EditIcon />
        </IconedButton>
      </div>
    </div>

    <div>
      <p class="text-xl font-bold uppercase">Password</p>

      <div class="px-4 py-2 flex items-center gap-2">
        <p
          class="border-gray-300 bg-gray-200 text-gray-800 flex-1 px-4 py-2 text-sm truncate border rounded-lg"
        >
          ****************************************************************
        </p>

        <IconedButton @click="showModal(`password`)" class="bg-sky-600 text-gray-100">
          <EditIcon />
        </IconedButton>
      </div>
    </div>
  </div>

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

      <div class="space-y-4">
        <template v-if="modalProperties.target === `image`">
          <input
            type="file"
            id="image"
            class="hidden"
            name="image"
            accept="image/png, image/jpeg"
          />

          <img
            alt="Material image"
            class="bg-gray-200 w-full aspect-video rounded-lg object-cover object-center"
          />

          <label
            for="image"
            class="border-emerald-600 bg-emerald-600 text-gray-100 w-max px-4 py-2 border rounded-lg flex items-center gap-4 cursor-pointer"
          >
            Upload image
          </label>
        </template>

        <template v-if="modalProperties.target === `name`">
          <InputText v-model.trim="name.first" id="first" label="First name" required />
          <InputText v-model.trim="name.middle" id="middle" label="Middle initial" required />
          <InputText v-model.trim="name.last" id="last" label="Last name" required />
        </template>

        <template v-if="modalProperties.target === `password`">
          <InputText v-model.trim="password.first" id="first" label="Password" required />
          <InputText v-model.trim="password.second" id="second" label="Retype password" required />
        </template>
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal"> Cancel </NeutralButton>

        <PrimaryButton type="submit" :disabled="loading"> Save </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive } from "vue";

import IconedButton from "@/components/IconedButton.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import InputText from "@/components/InputText.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const modal = ref(null);
const modalProperties = reactive({});
const name = reactive({
  first: "",
  middle: "",
  last: ""
});
const password = reactive({
  first: "",
  second: ""
});

const showModal = (target) => {
  modalProperties.target = target;

  if (target === "image") {
    modalProperties.title = "Upload new image";
    modalProperties.subtitle = "PNG or JPEG under 5mb";
  } else if (target === "name") {
    modalProperties.title = "Change full name";
    modalProperties.subtitle = "Input real name as it will reflect to the leaderboard";
  } else {
    modalProperties.title = "Change password";
    modalProperties.subtitle = "Modify your current password";
  }

  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};
</script>

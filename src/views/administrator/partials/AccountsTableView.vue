<template>
  <div class="border-gray-300 bg-gray-100 text-gray-700 flex-1 border rounded-lg overflow-hidden">
    <table class="h-full flex flex-col">
      <thead>
        <tr class="bg-purple-600 text-gray-100 p-2 rounded-t-lg uppercase grid grid-cols-12">
          <th class="col-span-10 p-2">{{ props.type }} Names</th>
          <th class="col-span-2 p-2">Action</th>
        </tr>
      </thead>

      <tbody class="flex-1 overflow-y-auto">
        <tr
          v-for="(item, index) in users"
          :key="index"
          :class="`${
            index % 2 === 0 ? 'bg-gray-300/50 text-gray-900' : 'bg-gray-200/50 text-gray-800'
          } grid grid-cols-12 transition-colors hover:bg-gray-400/50 hover:text-gray-950`"
        >
          <td class="col-span-10 px-4 py-2 flex items-center gap-2">
            <p class="font-medium mr-4">{{ `${index + 1}.` }}</p>

            <img
              :src="item.image"
              alt=""
              class="border-emerald-600 bg-emerald-600 w-6 aspect-square border rounded-full"
            />
            <p class="truncate">{{ `${item.fname} ${item.mname || ""} ${item.lname}` }}</p>
          </td>

          <td class="col-span-2 p-2">
            <PrimaryButton @click="showModal(item)" class="mx-auto">
              <p>Archive account</p>
            </PrimaryButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-bold uppercase truncate">Delete account</p>
          <p class="text-xs">{{ name }}</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div class="px-4">
        <p class="font-semibold">Do you really want to delete this account?</p>
        <p class="text-sm">This is permanent and it cannot be undone!</p>
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal"> Cancel </NeutralButton>

        <PrimaryButton :disabled="loading" type="submit" class="border-rose-600 bg-rose-600">
          Delete
        </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const router = useRouter();
const props = defineProps(["type", "show"]);
const type = props.type === "teacher" ? "users" : "students";
const response = await fetch(`https://elearning-api.webserv.site/api/get-${type}`);
const result = await response.json();
const users = type === "users" ? result : result.students;
const modal = ref();
const name = ref();
const loading = ref(false);
const id = ref();

const showModal = (item) => {
  name.value = `${item.fname} ${item.mname || ""} ${item.lname}`;
  id.value = item.id;
  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};

const submitForm = async () => {
  try {
    const result = ref();
    loading.value = true;

    const response = await fetch(`https://elearning-api.webserv.site/api/delete/users/${id.value}`);
    result.value = await response.json();

    if (result.value === 200) {
      result.value = null;
      loading.value = false;
      name.value = null;
      id.value = null;

      alert("Account successfully deleted!");
      router.go(0);
      unshowModal();
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

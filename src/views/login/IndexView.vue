<template>
  <main
    :style="`background-image: url(${SlccBackground})`"
    class="h-screen bg-center bg-no-repeat bg-cover"
  >
    <section class="h-full backdrop-blur grid place-items-center">
      <form
        @submit.prevent="signInAccount()"
        class="border-stone-300 bg-stone-100 w-[90%] max-w-md h-[85%] p-4 pt-8 border rounded-lg shadow flex flex-col gap-4 md:h-[75%]"
      >
        <div class="text-center">
          <img src="@/assets/img/SlccIcon.png" alt="SLCC Icon" class="w-20 mx-auto aspect-square" />

          <p class="my-4 grid">
            <span class="text-[0.65000rem]">E - Learning for Grade 1 Mathematics for</span>
            <span class="text-[0.78125rem] font-semibold"
              >Shining Light Christian College Inc.</span
            >
          </p>

          <p class="text-lg font-bold uppercase">Sign in your account</p>
          <p class="text-sm">Sign in as a {{ accountType }}</p>
        </div>

        <div class="flex-1 relative">
          <ZoomIn>
            <div v-if="!accountType" class="h-full p-4 grid gap-4 md:grid-cols-2">
              <PrimaryButton
                v-for="(item, index) in accountTypes"
                :key="index"
                @click="selectAccountType(item.name)"
                class="rounded-lg flex-col justify-center gap-0"
              >
                <img :src="item.icon" :alt="`${item.name} icon`" class="w-24 md:w-36" />

                <p class="capitalize">{{ item.name }}</p>
              </PrimaryButton>
            </div>
          </ZoomIn>

          <ZoomIn>
            <fieldset
              v-if="accountType"
              class="p-4 flex flex-col justify-between gap-4 absolute inset-0"
            >
              <div class="grid gap-4">
                <SecondaryButton v-if="accountType === `student`" @click="showModal()" class="">
                  {{ input.user_id ? input.user_id : `Select student account ` }}
                </SecondaryButton>

                <InputEmail v-else v-model.trim="input.user_id" id="email" label="Email" required />

                <InputPassword
                  v-model.trim="input.password"
                  id="password"
                  label="Password"
                  required
                />

                <p
                  v-if="isErrorMessageVisible"
                  class="text-red-600 w-max mx-auto px-4 py-2 text-xs text-center"
                >
                  {{ errorMassage }}
                </p>
              </div>

              <div class="grid">
                <PrimaryButton class="justify-center" type="submit"> Sign in </PrimaryButton>

                <TertiaryButton @click="unselectAccountType()" class="justify-center">
                  I am not a {{ accountType }}
                </TertiaryButton>
              </div>
            </fieldset>
          </ZoomIn>
        </div>
      </form>
    </section>
  </main>

  <dialog ref="modal" class="bg-transparent w-full max-w-lg p-1">
    <div class="border-stone-300 bg-stone-100 p-4 border rounded shadow grid gap-4">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p>Student Account List</p>
          <p class="text-xs">Select your account</p>
        </div>

        <IconedButton @click="unshowModal()">
          <CloseIcon />
        </IconedButton>
      </div>

      <ul class="max-h-96 grid overflow-y-auto">
        <li v-for="(item, index) in students.record" :key="index">
          <TertiaryButton @click="selectStudentAccount(item.user_id)" class="w-full">
            {{ `${item.fname} ${item.lname}` }}
          </TertiaryButton>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { readUser } from "@/api/authentication";
import { useProfileStore } from "@/stores/profile";

import InputEmail from "@/components/InputEmail.vue";
import InputPassword from "@/components/InputPassword.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import TertiaryButton from "@/components/TertiaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import ZoomIn from "@/transitions/ZoomIn.vue";

import SlccBackground from "@/assets/img/SlccBackground.webp";
import StudentsIcon from "@/assets/img/StudentsIcon.png";
import TeachersIcon from "@/assets/img/TeachersIcon.png";

const router = useRouter();
const store = useProfileStore();

const input = ref({
  user_id: null,
  password: null
});

const students = ref({
  record: null,
  count: null
});

const accountType = ref(null);
const modal = ref(null);
const errorMassage = ref(null);
const isErrorMessageVisible = ref(false);

const accountTypes = [
  {
    name: "student",
    icon: StudentsIcon
  },
  {
    name: "teacher",
    icon: TeachersIcon
  }
];

const selectAccountType = (type) => {
  accountType.value = type;
};

const unselectAccountType = () => {
  accountType.value = null;
  input.value.user_id = null;
  input.value.password = null;
  isErrorMessageVisible.value = false;
};

const showModal = () => {
  getStudentAccount();
  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};

const getStudentAccount = async () => {
  const url = new URL("https://elearning-api.webserv.site/api/get-students");

  const response = await fetch(url.toString());
  const data = await response.json();

  students.value.record = data.students;
  students.value.count = data.studentCount;
};

const selectStudentAccount = (user_id) => {
  input.value.user_id = user_id;
  isErrorMessageVisible.value = false;
  unshowModal();
};

const signInAccount = async () => {
  console.log("Clicked");

  if (accountType.value === `student`) {
    if (!input.value.user_id) {
      isErrorMessageVisible.value = true;
      errorMassage.value = "No student account selected";
      return;
    }
  }

  try {
    const response = await readUser(accountType.value, input.value.user_id, input.value.password);

    if (response.status_code === 200) {
      const role =
        response.user.role === 0
          ? "teacher"
          : response.user.role === 1
          ? "student"
          : "administrator";

      store.reset();

      store.profile = {
        id: response.user.id,
        fname: response.user.fname,
        mname: response.user.mname,
        lname: response.user.lname,
        email: response.user.user_id,
        type: role,
        token: `Bearer ${response.token}`
      };

      router.push({ name: "dashboard" });
    } else {
      isErrorMessageVisible.value = true;
      errorMassage.value =
        accountType.value === `student` ? `Incorrect password` : `Incorrect email or password`;
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

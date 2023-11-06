<template>
  <section v-if="profile.type !== `administrator`" class="h-full grid place-items-center">
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 p-4 border rounded-lg grid gap-4"
    >
      <p class="text-emerald-600 text-xl font-bold text-center uppercase p-4">
        Sign in as an administrator
      </p>

      <InputEmail v-model.trim="account.email" id="email" label="Email" required />
      <InputPassword v-model.trim="account.password" id="password" label="Password" required />
      <PrimaryButton type="submit" class="mt-8 justify-center"> Login </PrimaryButton>
    </form>
  </section>

  <section v-else class="h-full flex flex-col gap-2">
    <div
      class="border-gray-300 bg-gray-100 text-gray-700 p-4 border rounded-lg flex flex-col gap-2"
    >
      <div class="flex items-center justify-between gap-2">
        <PrimaryButton @click="showModal">
          <p>Create new {{ selectedAccount }} account</p>
        </PrimaryButton>

        <PrimaryButton @click="logoutAccount">
          <p>Logout</p>
        </PrimaryButton>
      </div>

      <div class="flex">
        <div class="border-gray-300 border rounded-lg">
          <button
            @click="selectAccount"
            :class="`${
              selectedAccount === `student` && `bg-emerald-600 text-gray-100`
            } px-4 py-2 rounded-l-lg transition-colors`"
            type="button"
          >
            <p>Student</p>
          </button>

          <button
            @click="selectAccount"
            :class="`${
              selectedAccount === `teacher` && `bg-emerald-600 text-gray-100`
            } px-4 py-2 rounded-r-lg transition-colors`"
            type="button"
          >
            <p>Teacher</p>
          </button>
        </div>
      </div>
    </div>

    <Suspense>
      <template #default>
        <AccountsTableView :type="selectedAccount" :key="count" />
      </template>

      <template #fallback>
        <p>Loading</p>
      </template>
    </Suspense>
  </section>

  <dialog ref="modal" class="bg-transparent">
    <form
      @submit.prevent="createNewAccount"
      class="border-gray-300 bg-gray-100 text-gray-700 min-w-[24rem] max-w-xl p-4 border rounded-lg flex flex-col gap-8"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-bold uppercase truncate">Create new account</p>
          <p class="text-xs capitalize">{{ selectedAccount }} account</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div class="space-y-4">
        <InputText v-model.trim="userAccount.fname" id="First name" label="First name" required />
        <InputText v-model.trim="userAccount.mname" id="Middle name" label="Middle name" />
        <InputText v-model.trim="userAccount.lname" id="Last name" label="Last name" required />
        <InputEmail v-model.trim="userAccount.email" id="Email" label="Email" required />
      </div>

      <div class="flex items-center justify-end gap-2">
        <NeutralButton @click="unshowModal"> Cancel </NeutralButton>

        <PrimaryButton :disabled="loading" type="submit"> Create </PrimaryButton>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useProfileStore } from "@/stores/profile";
import { readUser } from "@/api/authentication";

import AccountsTableView from "@/views/administrator/partials/AccountsTableView.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import InputText from "@/components/InputText.vue";
import InputEmail from "@/components/InputEmail.vue";
import InputPassword from "@/components/InputPassword.vue";
import IconedButton from "@/components/IconedButton.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const profileStore = useProfileStore();
const profile = profileStore.profile;
const selectedAccount = ref("student");
const count = ref(0);
const account = reactive({ email: "", password: "" });
const modal = ref();
const userAccount = reactive({
  fname: "",
  mname: "",
  lname: "",
  email: ""
});

const selectAccount = () => {
  selectedAccount.value = selectedAccount.value === "student" ? "teacher" : "student";
  count.value++;
};

const logoutAccount = () => {
  profileStore.reset();
};

const showModal = () => {
  modal.value.showModal();
};

const unshowModal = () => {
  modal.value.close();
};

const createNewAccount = async () => {
  try {
    const url = new URL("https://elearning-api.webserv.site/api/insert-user");
    const formData = new FormData();

    formData.append("fname", userAccount.fname);
    formData.append("mname", userAccount.mname);
    formData.append("lname", userAccount.lname);
    formData.append("role", selectedAccount.value === "teacher" ? 0 : 1);
    formData.append("image", null);
    formData.append("user_id", userAccount.email);
    formData.append("password", "password");

    const response = await fetch(url, { method: "POST", body: formData });

    if (response.ok) {
      alert("Account successfully created!");

      userAccount.fname = "";
      userAccount.mname = "";
      userAccount.lname = "";
      userAccount.email = "";

      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

const submitForm = async () => {
  try {
    const response = await readUser("admin", account.email, account.password);

    if (response.status_code === 200) {
      profile.id = response.user.id;
      profile.fname = response.user.fname;
      profile.mname = response.user.mname;
      profile.lname = response.user.lname;
      profile.email = response.user.user_id;
      profile.image = response.user.image;
      profile.type = "administrator";
      profile.token = response.token;

      alert("Login successfully!");
    } else {
      alert("Login failed!");
    }

    account.email = "";
    account.password = "";
  } catch (error) {
    console.error(error);
  }
};
</script>

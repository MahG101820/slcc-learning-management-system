<template>
  <section class="h-full flex flex-col gap-2">
    <div
      class="border-gray-300 bg-gray-100 text-gray-700 p-4 border rounded-lg flex flex-col gap-2"
    >
      <div class="flex items-center justify-between gap-2">
        <PrimaryButton>
          <p>Create new {{ selectedAccount }} account</p>
        </PrimaryButton>

        <PrimaryButton>
          <p>Logout</p>
        </PrimaryButton>
      </div>

      <div class="flex">
        <div class="border-gray-300 border rounded-lg">
          <button
            @click="selectAccount()"
            :class="`${
              selectedAccount === `student` && `bg-emerald-600 text-gray-100`
            } px-4 py-2 rounded-l-lg transition-colors`"
            type="button"
          >
            <p>Student</p>
          </button>

          <button
            @click="selectAccount()"
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
        <AccountsTableView :type="selectedAccount" />
      </template>

      <template #fallback>
        <p>Loading</p>
      </template>
    </Suspense>
  </section>
</template>

<script setup>
import { ref } from "vue";

import AccountsTableView from "@/views/administrator/partials/AccountsTableView.vue";

import PrimaryButton from "@/components/PrimaryButton.vue";

const selectedAccount = ref("student");

const selectAccount = () =>
  (selectedAccount.value = selectedAccount.value === "student" ? "teacher" : "student");
</script>

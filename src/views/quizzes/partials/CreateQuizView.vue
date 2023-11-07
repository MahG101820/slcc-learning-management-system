<template>
  <section class="h-full grid place-items-center">
    <form class="border-gray-300 bg-gray-100 text-gray-700 w-3/6 p-4 border rounded-lg">
      <div v-if="!quizHeader.title" class="grid gap-4">
        <InputText v-model.trim="quizHeader.title" id="quiz-title" label="Quiz title" required />
        <InputNumber v-model.trim="quizHeader.items" id="quiz-items" label="Quiz items" required />
        <select
          v-model="quizHeader.type"
          class="border-stone-400 bg-stone-100 text-stone-700 block px-4 py-2 w-full rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600"
        >
          <option>Multiple choice</option>
          <option>Binary choice</option>
          <option>Fill in the blanks</option>
        </select>
        <PrimaryButton class="mt-8 justify-center"> Create </PrimaryButton>
      </div>

      <div></div>
    </form>
  </section>
</template>

<script setup>
import { reactive } from "vue";

import PrimaryButton from "@/components/PrimaryButton.vue";
import InputText from "@/components/InputText.vue";
import InputNumber from "@/components/InputNumber.vue";

const quizHeader = reactive({
  title: "",
  items: 1,
  type: "Multiple choice"
});
</script>

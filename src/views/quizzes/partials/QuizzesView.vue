<template>
  <button
    v-for="(item, index) in quizzes"
    :key="index"
    type="button"
    class="border-stone-300 bg-stone-100 col-span-3 h-40 border rounded-lg"
  >
    <div class="bg-emerald-600 text-stone-100 h-12 rounded-t-lg grid place-items-center">
      <p class="text-xl font-bold uppercase">{{ `Quiz ${index + 1}` }}</p>
    </div>

    <div class="h-28 px-4 py-2 text-left rounded-b-lg flex flex-col">
      <p class="h-12 overflow-hidden">
        {{ item.description }}
      </p>

      <div class="flex-1 flex items-center gap-2">
        <p class="bg-stone-200 text-stone-500 px-2 py-1 text-[0.65rem] capitalize rounded-full">
          {{
            item.type === 0
              ? "Multiple Choice"
              : item.type === 1
              ? "Binary Choice"
              : "Fill in the blanks"
          }}
        </p>
      </div>
    </div>
  </button>

  <button type="button" class="border-stone-300 bg-stone-100 col-span-3 h-40 border rounded-lg">
    <p class="text-xl font-medium">Add new quiz</p>
  </button>
</template>

<script setup>
import { readQuizzes } from "@/api/quizzes";
import { useProfileStore } from "@/stores/profile";

const store = useProfileStore();
const quizzesList = await readQuizzes(store.profile.id);
const quizzes = quizzesList.filter((key) => key.user_id !== null);
</script>

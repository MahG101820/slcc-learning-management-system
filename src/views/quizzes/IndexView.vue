<template>
  <Suspense>
    <template #default>
      <section class="h-full grid grid-cols-12 gap-x-2 gap-y-4">
        <QuizzesView />
      </section>
    </template>

    <template #fallback>
      <section class="h-full grid grid-cols-12 grid-rows-2 gap-x-2 gap-y-4">
        <div
          v-for="(_, index) in 8"
          :key="index"
          class="border-gray-300 bg-gray-300 col-span-3 border rounded-lg animate-pulse"
        />
      </section>
    </template>
  </Suspense>
</template>

<script setup>
import QuizzesView from "@/views/quizzes/partials/QuizzesView.vue";
</script>

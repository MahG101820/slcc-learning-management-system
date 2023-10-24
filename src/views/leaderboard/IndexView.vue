<template>
  <Suspense>
    <template #default>
      <section class="h-full grid grid-cols-12 gap-4">
        <RankingView />
      </section>
    </template>

    <template #fallback>
      <section class="h-full grid grid-cols-12 gap-4">
        <div class="border-gray-300 bg-gray-300 col-span-8 border rounded-lg animate-pulse" />
        <div class="col-span-4 flex flex-col gap-4">
          <div v-for="(_, index) in 4" :key="index" class="border-gray-300 bg-gray-300 flex-1 border rounded-lg animate-pulse" />
        </div>
      </section>
    </template>
  </Suspense>
</template>

<script setup>
import RankingView from "@/views/leaderboard/partials/RankingView.vue";
</script>
